# Flosendo Website

A production-ready, deployable three-page website for Flosendo, an Edtech startup that provides entrepreneurship education for students.

## Features

- **Landing Page**: Introduction to Flosendo with call-to-action buttons
- **Product Page**: Showcase of the entrepreneurship education platform with images and features
- **Waitlist Page**: Contact form with email collection and newsletter signup
- **Backend API**: Vercel Serverless Functions with PostgreSQL database
- **Database Integration**: Real-time data storage with Vercel Postgres
- **Toast Notifications**: User-friendly success/error messages
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS
- **Modern UI**: Clean design with Flosendo brand colors and Baloo 2 font

## Brand Colors

- Primary: #7B2EFF (Purple)
- Secondary: #C6FF4F (Lime Green)
- Font: Baloo 2 (Google Fonts)

## Project Structure

```
flosendo-website/
├── package.json                 # Root package.json with scripts
├── README.md                   # This file
├── env.example                 # Environment variables template
├── api/
│   └── waitlist.js            # Vercel Serverless Function for waitlist
├── scripts/
│   └── migrate.js             # Database migration script
├── migrations/
│   └── create_waitlist_table.sql # SQL migration file
├── backend/
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Express server
│   └── submissions.json       # Form submissions storage (created automatically)
└── frontend/
    ├── package.json           # Frontend dependencies
    └── index.html             # Single-page application
```

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 3001) and frontend development server (port 3000).

3. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Alternative: Manual Setup

If you prefer to set up each part separately:

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Start the backend:**
   ```bash
   npm run server
   ```

5. **Start the frontend (in a new terminal):**
   ```bash
   npm run client
   ```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

The production server will serve both the frontend and backend on port 3001.

## Vercel Deployment with PostgreSQL

### 1. 设置 Vercel Postgres 数据库

1. 在 Vercel Dashboard 中创建新项目
2. 在项目设置中添加 Vercel Postgres 数据库
3. 复制数据库连接字符串

### 2. 配置环境变量

在 Vercel Project Settings > Environment Variables 中添加：

```
DATABASE_URL=postgres://default:password@ep-xxx.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require
```

### 3. 运行数据库迁移

在 Vercel 部署后，您需要运行迁移来创建表：

```bash
# 本地运行迁移（需要设置 DATABASE_URL）
npm run migrate

# 或者在 Vercel 中通过 Vercel CLI 运行
vercel env pull .env.local
npm run migrate
```

### 4. 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

## API Endpoints

### POST /api/waitlist

提交等待列表表单数据。

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "schoolName": "Example School"
}
```

**Success Response (200):**
```json
{
  "ok": true,
  "message": "Joined waitlist successfully",
  "data": {
    "id": 123,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400/409/500):**
```json
{
  "ok": false,
  "error": "Email already exists in waitlist"
}
```

## 本地开发设置

### 1. 安装依赖

```bash
npm install
```

### 2. 设置环境变量

复制 `env.example` 为 `.env` 并填入您的数据库连接字符串：

```bash
cp env.example .env
```

编辑 `.env` 文件：
```
DATABASE_URL=postgresql://username:password@localhost:5432/flosendo_waitlist
NODE_ENV=development
```

### 3. 运行数据库迁移

```bash
npm run migrate
```

### 4. 测试 API

使用 curl 测试：

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "schoolName": "Test School"
  }'
```

## 数据库 Schema

```sql
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  school_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 替代方案

如果您不想使用 Vercel Postgres，可以考虑以下替代方案：

### 1. Formspree 集成

修改前端表单提交到 Formspree：

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### 2. Google Sheets Webhook

使用 Google Apps Script 创建 webhook 端点，将数据写入 Google Sheets。

## Form Data Storage

等待列表提交数据存储在 PostgreSQL 数据库的 `waitlist_submissions` 表中，包含完整的用户信息和时间戳。

## Customization

### Colors

To change the brand colors, update the Tailwind config in `frontend/index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary': '#7B2EFF',    // Change this
        'secondary': '#C6FF4F',  // Change this
      }
    }
  }
}
```

### Content

Edit the content directly in `frontend/index.html`. The file contains all three pages in a single HTML file with JavaScript for navigation.

### Images

Replace the placeholder images in the Product page with your actual product images. Update the `src` attributes in the `<img>` tags.

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Tailwind CSS
- **Backend**: Vercel Serverless Functions, Node.js
- **Database**: PostgreSQL (Vercel Postgres)
- **Deployment**: Vercel
- **Fonts**: Google Fonts (Baloo 2)
- **Icons**: None (clean text-based design)
- **Images**: Unsplash placeholder images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this code for your own projects.

## Support

For questions or support, contact enquiries@flosendo.com
