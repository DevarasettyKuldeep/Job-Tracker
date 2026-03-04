# JobTracker

A clean, efficient web application built to organize and track job applications. I built this to move away from messy spreadsheets and have a dedicated dashboard for the internship hunt.

## Features

- **Dashboard**: Quick overview of your application stats (Total, Interviews, Offers).
- **Job Tracker**: Add, Edit, and Delete job applications with details like Company, Role, Salary, and Location.
- **Kanban Board**: A visual status board to see exactly where you are in the pipeline for every application.
- **User Authentication**: Secure login and registration to keep your data private.

## Tech Stack

- **Frontend**: React.js with Vite, TailwindCSS for styling.
- **Backend**: Node.js and Express.js.
- **Database**: MongoDB (Local or Atlas via environment variables).

## Setup and Installation

### Prerequisites
- Node.js installed
- MongoDB installed (or a MongoDB Atlas connection string)

### Getting Started

1. **Clone the repository**
2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file based on the environment variables needed (PORT, MONGODB_URI, JWT_SECRET)
   npm run dev
   ```
3. **Setup the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. **Access the Application**
   - The app will be available at `http://localhost:5173`.

## Deployment

This application is ready to be deployed to platforms like Render (backend) and Vercel/Netlify (frontend). Remember to configure your MongoDB Atlas connection string and JWT Secrets in the environment variables of your hosting provider.