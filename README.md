# ShakeDvirGantt

## Overview

ShakeDvirGantt is a project I built with love for my girlfriend to help her manage her social media presence on Instagram. It's a web application that allows her to schedule posts, reels, highlights, and stories for her clients. This project is built using Vite, React, Node.js, and Express.

As the super user (your girlfriend), she can create user accounts for her clients and schedule content on specific dates using the `react-big-calendar` component. All the media files (photos and videos) are stored on the backend server and presented on the frontend for easy scheduling and management.

## Features

- User Management: Super user (your girlfriend) can create, edit, and delete user accounts for her clients.
- Content Scheduling: Schedule posts, reels, highlights, and stories for specific dates and times.
- Media Library: Easily access and select photos and videos from the media library for scheduling.
- Calendar View: Use the `react-big-calendar` component to view scheduled content on a calendar.
- Backend Storage: All media files are stored securely on the backend server.

## Technologies Used

- Frontend:
  - React
  - Vite
  - `react-big-calendar` for calendar view

- Backend:
  - Node.js
  - Express.js
  - MongoDB for database storage
  - Multer for handling file uploads

## Configuration

1. Create a `.env` file in the `backend` directory and configure your MongoDB connection:

   ```env
   MONGODB_URI=your-mongodb-connection-string


## Usage

- Log in as the super user (your girlfriend) to create and manage client accounts.
- Use the calendar view to schedule posts, reels, highlights, and stories for specific dates.
- Access the media library to select photos and videos for scheduling.
- All media files are securely stored on the backend server.

This project uses JWT (JSON Web Tokens) for user authentication and sessions to maintain user login states.

## Credits

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [react-big-calendar](https://github.com/jquense/react-big-calendar)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Acknowledgments

I would like to thank my girlfriend for inspiring and motivating me to create this project. It was built with love and dedication. 💕

Anyone who needs something similar can take this idea, customize it for their needs, and create their own special project. May it inspire you to build something wonderful! 🚀
