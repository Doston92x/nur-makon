# Hotel Booking App - Complete Deployment Guide

## Quick Start Overview

**IMPORTANT**: You must push your project to GitHub FIRST, then clone it on your server.

### The Correct Order:
1. Push your project to GitHub (this step)
2. Set up Hetzner server
3. Clone from GitHub to server
4. Configure and deploy

---

## Step 1: Push Your Project to GitHub

### 1.1 Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `nurmakon-hotel` (or your preferred name)
3. Make it **public** (easier for deployment) or private (more secure)
4. **Do NOT** initialize with README, .gitignore, or license (since you already have files)

### 1.2 Push Your Current Project
Run these commands in your project directory:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Hotel booking app with Docker deployment"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/nurmakon-hotel.git

# Push to GitHub
git push -u origin main
```

**If you get an error about 'main' branch, try:**
```bash
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up DockerHub (for automated builds)

### 2.1 Create DockerHub Account
1. Go to [DockerHub](https://hub.docker.com/)
2. Create account or sign in
3. Create new repository: `nurmakon-hotel`
4. Go to Account Settings → Security → Access Tokens
5. Create new token with Read/Write permissions
6. **SAVE THE TOKEN** - you'll need it for GitHub secrets

---

## Step 3: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets (click "New repository secret"):

```
Name: DOCKERHUB_USERNAME
Value: your_dockerhub_username

Name: DOCKERHUB_TOKEN  
Value: your_dockerhub_access_token_from_step_2.1

Name: HETZNER_HOST
Value: your_hetzner_server_ip (you'll get this in step 4)

Name: HETZNER_USERNAME
Value: root

Name: HETZNER_SSH_KEY
Value: your_private_ssh_key_content (you'll generate this in step 4)
```

---

## Step 4: Set Up Hetzner Server

### 4.1 Generate SSH Key (on your local machine)
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/hetzner_key

# Display public key (copy this)
cat ~/.ssh/hetzner_key.pub

# Display private key (copy this for GitHub secrets)
cat ~/.ssh/hetzner_key
```

### 4.2 Create Hetzner Server
1. Go to [Hetzner Cloud Console](https://console.hetzner.cloud/)
2. Create new project
3. Create server:
   - **Image**: Ubuntu 22.04
   - **Type**: CX21 (2 vCPU, 4GB RAM) - minimum recommended
   - **Location**: Choose closest to your users
   - **SSH Key**: Paste the public key from step 4.1
   - **Name**: nurmakon-hotel-server

4. **IMPORTANT**: Copy the server's IP address - you need this for GitHub secrets

### 4.3 Update GitHub Secrets
Now update these GitHub secrets with actual values:
- `HETZNER_HOST`: Your server IP from step 4.2
- `HETZNER_SSH_KEY`: Private key content from step 4.1

---

## Step 5: Prepare Server

### 5.1 Connect to Your Server
```bash
# Connect using the private key
ssh -i ~/.ssh/hetzner_key root@YOUR_SERVER_IP
```

### 5.2 Install Required Software
```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install additional tools
apt install -y git curl wget

# Verify installations
docker --version
docker-compose --version
git --version
```

### 5.3 Create Project Directory and Clone
```bash
# Create project directory
mkdir -p /opt/nurmakon-hotel
cd /opt/nurmakon-hotel

# Clone your repository (replace with your actual GitHub URL)
git clone https://github.com/YOUR_USERNAME/nurmakon-hotel.git .

# Verify files are there
ls -la
```

---

## Step 6: Configure Environment

### 6.1 Create Production Environment File
```bash
cd /opt/nurmakon-hotel
cp .env.example .env
nano .env
```

### 6.2 Fill in Your Values
Replace the placeholder values with real ones:

```bash
# Database Configuration
POSTGRES_PASSWORD=YourSuperSecurePassword123!
DATABASE_URL=postgresql://postgres:YourSuperSecurePassword123!@db:5432/nurmakon_hotel

# Application Configuration
NODE_ENV=production
PORT=5000
SESSION_SECRET=your-super-secret-32-character-minimum-session-key-here

# Docker Configuration  
DOCKER_IMAGE=your-dockerhub-username/nurmakon-hotel:latest

# Domain (optional - use IP if no domain)
DOMAIN=your-domain.com
```

**Security Tips:**
- Use strong passwords (20+ characters with symbols)
- Generate session secret: `openssl rand -hex 32`
- Replace `your-dockerhub-username` with your actual username

---

## Step 7: Test Manual Deployment

### 7.1 Run Deployment Script
```bash
cd /opt/nurmakon-hotel
chmod +x deploy.sh
./deploy.sh
```

This will:
- Build Docker images
- Start all services
- Run health checks
- Show status

### 7.2 Verify Website Works
```bash
# Test health endpoint
curl http://localhost/health

# Should return: healthy

# If you have a domain:
curl http://your-domain.com/health
```

---

## Step 8: Test Automated Deployment

### 8.1 Make a Small Change
On your local machine:
```bash
# Make any small change to test CI/CD
echo "# Test deployment" >> README.md
git add .
git commit -m "Test automated deployment"
git push origin main
```

### 8.2 Watch GitHub Actions
1. Go to your GitHub repository
2. Click "Actions" tab
3. You should see a workflow running
4. It will automatically deploy to your server

---

## Step 9: Set Up Domain and SSL (Optional)

### 9.1 Point Domain to Server
In your domain registrar's DNS:
- **Type**: A Record
- **Name**: @ (for root domain) or subdomain
- **Value**: Your Hetzner server IP
- **TTL**: 300

### 9.2 Install SSL Certificate
```bash
# Install certbot
apt install -y certbot

# Get certificate (replace with your domain)
certbot certonly --standalone -d your-domain.com

# The certificates will be saved to:
# /etc/letsencrypt/live/your-domain.com/
```

### 9.3 Update Nginx for SSL
```bash
nano /opt/nurmakon-hotel/nginx.conf
```

Add SSL configuration to the server block:
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Rest of configuration...
}
```

Restart containers:
```bash
docker-compose restart nginx
```

---

## Troubleshooting Common Issues

### GitHub Authentication Issues
```bash
# If you get permission denied, use personal access token
git remote set-url origin https://YOUR_USERNAME:YOUR_PERSONAL_ACCESS_TOKEN@github.com/YOUR_USERNAME/nurmakon-hotel.git
```

### Docker Issues
```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs app
docker-compose logs db
docker-compose logs nginx

# Restart all services
docker-compose restart

# Complete rebuild
docker-compose down
docker-compose up -d --build
```

### Server Connection Issues
```bash
# Test SSH connection
ssh -i ~/.ssh/hetzner_key -v root@YOUR_SERVER_IP

# Check server firewall
ufw status
```

---

## Final Checklist

- ✅ Project pushed to GitHub
- ✅ DockerHub account created with repository
- ✅ GitHub secrets configured
- ✅ Hetzner server created and configured
- ✅ SSH keys generated and added
- ✅ Server software installed (Docker, Docker Compose, Git)
- ✅ Repository cloned to server
- ✅ Environment variables configured
- ✅ Manual deployment tested
- ✅ Automated deployment tested
- ✅ Website accessible

## Your URLs After Deployment

- **Website**: `http://YOUR_SERVER_IP` or `https://your-domain.com`
- **Health Check**: `http://YOUR_SERVER_IP/health`
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/nurmakon-hotel`
- **DockerHub**: `https://hub.docker.com/r/YOUR_USERNAME/nurmakon-hotel`

---

**Need Help?** 
- Check GitHub Actions logs for deployment issues
- Use `docker-compose logs app` on server to debug
- Verify all environment variables are set correctly