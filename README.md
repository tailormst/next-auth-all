# Modern Classroom Authentication with Next.js & TypeScript

This project implements a fully authenticated system using Next.js with email verification via Mailtrap and password reset functionalities. Additionally, it features a modern classroom frontend built with Next.js and TypeScript.

## Features

- User Authentication (Signup, Login, Logout)
- Email Verification using Mailtrap
- Forgot Password & Reset Password functionality
- Modern Classroom Frontend in Next.js & TypeScript
- User Data Management with MongoDB
- Toast Notifications for better UX
- Insert URL Link of Google Sheets for Attendance (Manual)

## Tech Stack

- Next.js (App Router)
- TypeScript
- MongoDB & Mongoose (Database)
- Tailwind CSS (Styling)
- Mailtrap (Email Sending)
- React Toast (Notifications)
- Axios (API Requests)
- Google Sheets API (Attendance Tracking)

## Installation & Setup

### Clone the repository:
```sh
git clone https://github.com/your-repo/modern-classroom.git
cd modern-classroom
```

### Install dependencies:
```sh
npm install
```

### Set up environment variables in `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
```

### Start the development server:
```sh
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/users/signup` – Register a new user
- `POST /api/users/login` – Login user
- `POST /api/users/logout` – Logout user
- `POST /api/users/verifyemail` – Verify email via token
- `POST /api/users/forgotpassword` – Request password reset
- `POST /api/users/resetpassword` – Reset password

### Classroom

- `GET /api/classrooms` – Fetch all classrooms
- `POST /api/classrooms` – Create a new classroom
- `GET /api/classrooms/:id` – Get details of a classroom
- `POST /api/attendance` – Track attendance via Google Sheets

## Contribution

Consider enhancing the project by adding features such as:
1) **Advanced Attendance Tracker** – Automate attendance marking with facial recognition or QR codes.
2) **Assignment Management** – Allow teachers to assign homework and set due dates.
3) **Student Submission Portal** – Enable students to submit assignments before deadlines.
4) **Enhanced Frontend UI** – Improve user experience with better design and responsiveness.

Feel free to contribute by opening issues or submitting pull requests. Happy coding! 🚀
