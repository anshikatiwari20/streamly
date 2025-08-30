# Your Notes – Notes Taking App

## Introduction

Your Notes is a robust MERN Stack application designed to help users manage their notes efficiently. Built using MongoDB, Express.js, React, and Node.js, the app allows seamless CRUD (Create, Read, Update, Delete) operations and works across devices thanks to its responsive design.

## Features

- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **CRUD Operations**: Full management of notes – create, read, update, and delete.
- **Search Functionality**: Easily find notes by keywords.
- **Responsive Design**: Works smoothly on desktops, tablets, and mobile devices.
- **Real-time Updates**: Dynamic interface powered by React.

## Technology Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Managed through JSON Web Tokens (JWT)

## Setup Instructions

### Prerequisites

Ensure you have Node.js, npm, and a MongoDB account set up before you begin.

### Backend Setup

1. Begin by navigating to your backend directory:
    ```bash
    cd backend
    ```
2. Install necessary dependencies:
    ```bash
    npm install
    ```
3. Set up your environment variables in a `.env` file within the backend directory:
    ```plaintext
    ACCESS_TOKEN_SECRET=
    MONGO_URL=
    ```
4. Launch the server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Move to your frontend directory:
    ```bash
    cd frontend
    ```
2. Install required dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in .env:
    ```bash
    VITE_BASE_URL=
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

Now, the app should be running at `http://localhost:3000`.

## How to Use

- **Register/Login**: Sign up for an account or log in.
- **Creating Notes**: Add a new note with a title and content.
- **Viewing Notes**: Browse your notes on the dashboard.
- **Editing Notes**: Update a note’s details anytime.
- **Deleting Notes**: Remove notes directly from the dashboard.
- **Searching Notes**: Quickly locate notes using keywords.

---
