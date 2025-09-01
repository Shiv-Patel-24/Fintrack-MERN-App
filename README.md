# FinTrack - MERN Stack Financial Tracker 📊

# Live : fintrack-mern-app.vercel.app

FinTrack is a comprehensive, full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) designed to help business owners and individuals track their income and expenses effortlessly. It features a secure, modern user dashboard and a powerful admin panel for complete platform management.

This project was built from the ground up, focusing on a clean architecture, robust security, and a polished, responsive user interface.

## ✨ Key Features

### User Dashboard

* **Secure Authentication:** Local email/password registration and login, plus "Sign in with Google" OAuth 2.0.
* **Password Reset:** Secure "Forgot Password" flow using email verification.
* **Transaction Management:** Full CRUD (Create, Read, Update, Delete) functionality for income and expense records.
* **Interactive Dashboard:** A central hub to view key financial metrics.
* **Data Visualization:** A dynamic pie chart summarizing monthly income vs. expenses.
* **Advanced Filtering:** Filter transactions by month, year, and type (income/expense).
* **Data Export:** Export transaction data to a `.csv` file with flexible date range options.
* **Pagination:** A clean, paginated list for handling a large number of transactions.
* **Responsive Design:** A beautiful and functional interface on all devices, from mobile phones to desktops.
* **Light/Dark Mode:** A theme toggler for a personalized user experience.

### Admin Panel

* **Separate Secure Login:** A dedicated login portal for administrators.
* **User Management:** View a paginated list of all registered users.
* **Role Management:** Promote or demote users between 'user' and 'admin' roles directly from the dashboard.
* **User Deletion:** Securely delete users from the platform.
* **Detailed User Insights:** Click on any user to view their complete, filterable financial dashboard, including their transactions and summary statistics.
* **Platform-Wide Statistics:** An admin dashboard showing high-level analytics like total users, total income/expense across the platform, and net profit.

## 🛠️ Tech Stack

* **Frontend:** React 18 (with Vite), React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** Passport.js (Local, JWT, and Google OAuth20 strategies), Secure `httpOnly` cookies
* **Validation:** Joi
* **Styling:** CSS3 with custom properties (variables) for theming and responsiveness.
* **Animations:** CSS Animations
* **API Client:** Axios
* **CSV Export:** `json2csv`
* **Emailing:** Nodemailer (for password reset)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* npm
* MongoDB installed locally or a MongoDB Atlas account.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install root dependencies:**
    ```bash
    npm install
    ```

3.  **Backend Setup:**
    * Navigate to the server directory: `cd server`
    * Install backend dependencies: `npm install`
    * Create a `.env` file in the `/server` directory and add the required environment variables (see `.env.example` below).

4.  **Frontend (Client) Setup:**
    * Navigate to the client directory: `cd client`
    * Install frontend dependencies: `npm install`

5.  **Frontend (Admin) Setup:**
    * Navigate to the admin directory: `cd admin`
    * Install admin panel dependencies: `npm install`

### Environment Variables (`server/.env`)

You need to create a `.env` file in the `/server` directory and add the following keys.
