# File Sharing Web Application

This is a file-sharing web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to upload, share, and manage files securely. The application incorporates various tools such as Zod for schema validation, bcrypt for password hashing, and multer for file uploads. It also follows the principles of RESTful API design.

## Features

- **User Authentication**: Secure user authentication using JWT and bcrypt.
- **File Upload**: Upload files of various types and sizes using multer.
- **File Sharing**: Generate shareable links for uploaded files.
- **File Management**: View and download files.
- **Responsive Design**: Fully responsive and works on all devices.
- **Data Validation**: Input validation using Zod.
- **RESTful API**: Well-structured API for interacting with the backend.

## Installation

### Prerequisites

- Node.js
- MongoDB (Atlas)
- npm

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/krish-odhaviya/CodeClauseInternship_FileSharing.git
    cd CodeClauseInternship_FileSharing
    ```

2. Install the dependencies:
    ```sh
    cd server
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_KEY=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    nodemon index.js
    ```

### Frontend Setup

1. Navigate to the `client` directory:
    ```sh
    cd client
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

 3. Create a `.env` file in the `server` directory and add the following variables:
    ```env
    VITE_APP_URI_API=add_server_address
    ```
    in my case http://localhost:3000

3. Start the frontend development server:
    ```sh
    npm start
    ```

### Running the Application

1. Ensure MongoDB is running.
2. Start the backend and frontend servers as described above.
3. Open your browser and navigate to `http://localhost:PORT_ALLOCATED_BY_CLIENT_SERVER` to access the application.

## Technologies Used

- **MongoDB**: Database
- **Express.js**: Backend framework
- **React.js**: Frontend library
- **Node.js**: Runtime environment
- **Zod**: Schema validation
- **bcrypt**: Password hashing
- **multer**: File uploading
- **RESTful API**: API design

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Developed by [krish-odhaviya](linkedin.com/in/krish-odhaviya)
