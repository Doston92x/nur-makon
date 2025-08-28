#!/bin/bash

# Deployment script for Nur Makon Hotel
# This script handles Docker deployment on Hetzner server

set -e

echo "🏨 Starting Nur Makon Hotel deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[DEBUG]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_warning "Running as root. Consider using a non-root user for better security."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    print_error "Please edit .env file with your actual values before running this script again."
    print_info "Required variables: POSTGRES_PASSWORD, SESSION_SECRET, DOCKER_IMAGE"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
if [ -z "$POSTGRES_PASSWORD" ] || [ "$POSTGRES_PASSWORD" = "your_secure_password_here" ]; then
    print_error "Please set POSTGRES_PASSWORD in .env file"
    exit 1
fi

if [ -z "$SESSION_SECRET" ] || [ "$SESSION_SECRET" = "your_super_secret_session_key_here" ]; then
    print_error "Please set SESSION_SECRET in .env file"
    exit 1
fi

# Function to wait for service to be ready
wait_for_service() {
    local service_name=$1
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose ps | grep "$service_name" | grep -q "Up (healthy)"; then
            print_status "$service_name is ready!"
            return 0
        elif docker-compose ps | grep "$service_name" | grep -q "Up"; then
            print_info "$service_name is up but not yet healthy... (attempt $attempt/$max_attempts)"
        else
            print_info "Waiting for $service_name... (attempt $attempt/$max_attempts)"
        fi
        
        sleep 10
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to become ready within the expected time"
    return 1
}

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down || true

# Pull latest images (if using external registry)
if [ ! -z "$DOCKER_IMAGE" ] && [ "$DOCKER_IMAGE" != "nurmakon-hotel:latest" ]; then
    print_status "Pulling latest Docker image: $DOCKER_IMAGE"
    docker pull "$DOCKER_IMAGE" || true
fi

# Start new containers
print_status "Starting containers with Docker Compose..."
docker-compose up -d

# Wait for database to be ready
wait_for_service "db"

# Wait for application to be ready
wait_for_service "app"

# Additional wait for nginx to be ready
sleep 10

# Health check
print_status "Performing health check..."
max_retries=5
retry=1

while [ $retry -le $max_retries ]; do
    if curl -f -s http://localhost/health > /dev/null 2>&1; then
        print_status "✅ Deployment successful! Hotel website is running"
        break
    else
        if [ $retry -eq $max_retries ]; then
            print_error "❌ Health check failed after $max_retries attempts"
            print_error "Container logs:"
            docker-compose logs --tail=50 app
            exit 1
        else
            print_warning "Health check failed, retrying... ($retry/$max_retries)"
            sleep 10
            retry=$((retry + 1))
        fi
    fi
done

# Show container status
print_status "Container status:"
docker-compose ps

# Cleanup old Docker images
print_status "Cleaning up old Docker images..."
docker image prune -f

print_status "🎉 Nur Makon Hotel is now live!"
print_status "🌐 Visit: http://localhost (or your domain)"
print_status "🔧 Admin commands:"
print_info "  View logs: docker-compose logs -f app"
print_info "  Database access: docker-compose exec db psql -U postgres -d nurmakon_hotel"
print_info "  Restart: docker-compose restart"
print_info "  Stop: docker-compose down"