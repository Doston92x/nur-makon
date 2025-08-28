<<<<<<< HEAD
# nur-makon
Websayt
=======
# Nur Makon Hotel - Booking Website

A full-stack hotel booking application with multi-language support (English, Russian, Uzbek) built with React, Express, PostgreSQL, and Docker.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git (for CI/CD)

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd nurmakon-hotel

# Copy environment file
cp .env.example .env
# Edit .env with your database credentials

# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f app
```

Your hotel website will be available at `http://localhost`

## 🏗️ Production Deployment on Hetzner

### 1. Server Setup
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
sudo mkdir -p /opt/nurmakon-hotel
sudo chown $USER:$USER /opt/nurmakon-hotel
```

### 2. Deploy Application
```bash
# Clone repository to server
cd /opt/nurmakon-hotel
git clone <your-repo-url> .

# Configure environment
cp .env.example .env
nano .env  # Add your production settings

# Make deployment script executable
chmod +x deploy.sh

# Deploy
./deploy.sh
```

## 🔄 CI/CD with GitHub Actions

### Setup GitHub Secrets
In your GitHub repository, add these secrets:

```
HETZNER_HOST=your_server_ip
HETZNER_USERNAME=your_username
HETZNER_SSH_KEY=your_private_ssh_key
GITHUB_TOKEN=automatically_provided
```

### SSH Key Setup
```bash
# On your local machine, generate SSH key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id user@your_server_ip

# Add private key content to GitHub Secrets as HETZNER_SSH_KEY
```

### Automatic Deployment
Push to main branch triggers automatic deployment:
```bash
git add .
git commit -m "Update hotel website"
git push origin main
```

## 🗄️ Database Management

### Connect to Database
```bash
# Via Docker
docker-compose exec db psql -U postgres -d nurmakon_hotel

# Or directly with psql
psql -h localhost -U postgres -d nurmakon_hotel
```

### Database Backup
```bash
# Create backup
docker-compose exec db pg_dump -U postgres nurmakon_hotel > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres -d nurmakon_hotel < backup.sql
```

## 🛠️ Development Commands

### Docker Commands
```bash
# Build image
docker build -t nurmakon-hotel .

# Run single container
docker run -p 3000:3000 nurmakon-hotel

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Update and restart
docker-compose pull && docker-compose up -d
```

### Manual Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create `.env` file with:
```env
# Database
DATABASE_URL=postgresql://postgres:your_password@db:5432/nurmakon_hotel
POSTGRES_PASSWORD=your_secure_password

# Application
NODE_ENV=production
PORT=3000

# Optional: Email configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

## 📱 Features

- **Multi-language Support**: English, Russian, Uzbek
- **Room Management**: Different room types with pricing
- **Booking System**: Complete reservation management
- **Contact System**: Customer inquiry handling
- **Responsive Design**: Works on all devices
- **Database Persistence**: PostgreSQL for production data
- **Docker Support**: Easy deployment and scaling
- **CI/CD Ready**: Automated deployment with GitHub Actions

## 🔧 Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check logs
docker-compose logs app

# Verify database connection
docker-compose exec app npm run db:push
```

**Database connection failed:**
```bash
# Check database status
docker-compose ps db

# Restart database
docker-compose restart db
```

**Port already in use:**
```bash
# Find process using port
sudo lsof -i :80

# Kill process
sudo kill -9 <PID>
```

## 📞 Support

For deployment assistance or customization:
- Check logs: `docker-compose logs -f`
- Database issues: `docker-compose exec db psql -U postgres`
- Application issues: `docker-compose restart app`

## 🔒 Security Notes

- Change default PostgreSQL password
- Use strong passwords in production
- Keep Docker images updated
- Configure SSL certificates for HTTPS
- Use firewall to limit access to necessary ports only

## 📄 License

MIT License - Feel free to use for your hotel business!
>>>>>>> fda15b0 (Tayyor)
