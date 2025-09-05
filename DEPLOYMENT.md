# Deployment Guide

## Quick Start (No Node.js Required)

If you don't have Node.js installed, you can still view the website:

1. **Open the standalone version:**
   - Navigate to `frontend/standalone.html`
   - Open it in any modern web browser
   - Note: Form submissions won't be saved (shows alert instead)

## Full Setup (With Backend)

### Prerequisites

1. **Install Node.js:**
   - Download from https://nodejs.org/
   - Choose the LTS version
   - Verify installation: `node --version` and `npm --version`

### Local Development

1. **Clone/Download the project:**
   ```bash
   # If using git
   git clone <repository-url>
   cd flosendo-website
   
   # Or extract the ZIP file and navigate to the folder
   ```

2. **Install dependencies:**
   ```bash
   # Windows
   setup.bat
   
   # macOS/Linux
   chmod +x setup.sh
   ./setup.sh
   
   # Or manually
   npm run install-all
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Production Deployment

#### Option 1: Heroku

1. **Install Heroku CLI:**
   - Download from https://devcenter.heroku.com/articles/heroku-cli

2. **Create Heroku app:**
   ```bash
   heroku create flosendo-website
   ```

3. **Set up environment:**
   ```bash
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

#### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

#### Option 3: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to Netlify:**
   - Drag and drop the `frontend` folder to Netlify
   - Or connect your Git repository

#### Option 4: Traditional Hosting

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Upload the entire project to your web server
   - Make sure Node.js is installed on the server

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Environment Variables

For production, you may want to set these environment variables:

```bash
NODE_ENV=production
PORT=3001
```

### Database Setup (Optional)

The current setup uses JSON file storage. For production, consider:

1. **MongoDB:**
   ```bash
   npm install mongoose
   ```

2. **PostgreSQL:**
   ```bash
   npm install pg
   ```

3. **MySQL:**
   ```bash
   npm install mysql2
   ```

### SSL/HTTPS

For production deployment, ensure SSL is enabled:

1. **Heroku:** Automatic SSL
2. **Vercel:** Automatic SSL
3. **Netlify:** Automatic SSL
4. **Custom hosting:** Use Let's Encrypt or your SSL provider

### Monitoring

Consider adding:

1. **Error tracking:** Sentry, Bugsnag
2. **Analytics:** Google Analytics, Mixpanel
3. **Uptime monitoring:** UptimeRobot, Pingdom

### Performance Optimization

1. **Enable gzip compression**
2. **Use CDN for static assets**
3. **Optimize images**
4. **Minify CSS/JS**

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill process using port 3001
   npx kill-port 3001
   ```

2. **Permission denied:**
   ```bash
   # Fix file permissions
   chmod +x setup.sh
   ```

3. **Module not found:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Support

For deployment issues, contact enquiries@flosendo.com
