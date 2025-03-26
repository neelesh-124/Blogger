# Blogger

## About

Blogger is a **blog posting platform** that allows users to:

- Create an account
- Write and publish blogs
- Read blogs posted by other users

This project is built using **MongoDB**, **ExpressJS**, and **EJS** to deliver a dynamic blogging experience.

---

## Technologies Used

- **MongoDB**: For data storage and retrieval.
- **ExpressJS**: To handle backend operations and API requests.
- **EJS**: For rendering dynamic web pages.

---

## NPM Packages Used

This project utilizes the following **npm packages**:

1. **cookie-parser**: To handle cookies in Express.
2. **dotenv**: To manage environment variables securely.
3. **ejs**: To enable dynamic webpage rendering.
4. **express**: The core backend framework.
5. **jsonwebtoken**: For secure user authentication.
6. **mongoose**: To interact with the MongoDB database.
7. **multer**: For handling file uploads.

---

## Installation & Setup

Use the following steps to setup this project on any system:

1. **Clone the Repository**
   ```sh
   git clone https://github.com/neelesh-124/Blogger
   cd blogger
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the required environment variables:
     ```env
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. **Start the Server**
   ```sh
   npm start
   ```
5. **Visit the Application**
   - Open your browser and go to `http://localhost:3000`

---

## Features

- User Authentication (Login/Signup)
- Create, Edit, and Delete Blogs
- View and Read Blogs from Other Users
- Secure Sessions with JWT
- File Uploads for Blog Images

### Happy Blogging! 👾
