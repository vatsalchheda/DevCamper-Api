const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss-clean');
const mongosanatize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// DEV Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize Data
app.use(mongosanatize);

// Set Security Headers
app.use(helmet());

// Use XSS clean to remove Scripts (Prevent Cross site Scripting tags)
app.use(xss());

//Enable CORS
app.use(cors);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// File Upload
app.use(fileupload());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount ROuters
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening in ${process.env.NODE_ENV} mode on port ${PORT}!`);
});

// Handle Unhandled promise Rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close Server and exit process
  server.close(() => {
    process.exit(1);
  });
});
