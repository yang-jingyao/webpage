# Flosendo Website

A production-ready, deployable three-page website for Flosendo, an Edtech startup that provides entrepreneurship education for students.

## Features

- **Landing Page**: Introduction to Flosendo with call-to-action buttons
- **Product Page**: Showcase of the entrepreneurship education platform with images and features
- **Subscribe Page**: Contact form with email collection and newsletter signup
- **Backend API**: Node.js/Express server with form submission handling
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

## API Endpoints

### POST /subscribe

Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your program!",
  "subscribeToNewsletter": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your submission!",
  "submission": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'm interested in your program!",
    "subscribeToNewsletter": true,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/submissions

Get all form submissions (for admin purposes).

## Form Data Storage

Form submissions are stored in `backend/submissions.json` as JSON data. In a production environment, you would typically use a proper database like MongoDB, PostgreSQL, or MySQL.

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
- **Backend**: Node.js, Express.js
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
