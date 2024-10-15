

const express = require('express');
const connection = require('./connection'); // Ensure this is a CommonJS module
// const cookieParser = require('cookie-parser');
const cors = require('cors');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
const EmployeeRouter = require('./routes/EmployeeRouter'); // Ensure this is CommonJS
const AdminRouter = require('./routes/AdminRouter'); // Ensure this is CommonJS
// const routes = require('./routes/index'); // Ensure this is CommonJS
// const { errorHandler, routeNotFound } = require('./middlewares/errormiddleware'); // Uncomment and fix the import
// const TaskRouter = require('./routes/taskRoutes');
const ProjectRouter = require('./routes/ProjectsRoutes');
const ProjectsDetailsRouter = require('./routes/ProjectsdetailsRouter')
// const UserRouter = require('./routes/userRouter');
const server = express();

// dotenv.config();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173'];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// server.use(cookieParser());
// server.use(morgan("dev"));
server.use(cors(corsOptions));
server.use(express.static("./public"));
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// Define your routes
server.use("/employee", EmployeeRouter);
// server.use("/api", routes);
server.use("/admin", AdminRouter);
server.use("/projects", ProjectRouter);
// server.use("/user", UserRouter);
server.use("/projectsdetails", ProjectsDetailsRouter);
// Database connection and server start
connection()
  .then(() => {
    console.log('DB connected');
    server.listen(5000, () => {
      console.log('Server started on http://localhost:5000');
    });
  })
  .catch(() => {
    console.log('Unable to connect with DB');
  });
