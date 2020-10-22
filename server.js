const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGODG_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Mongoose Connect
mongoose.connect(db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log(`MongoDB database connection established successfully.`);
  }
);

// Backend Routing (API)
const practicesRouter = require('./server/routes/practices');
const teachersRouter = require('./server/routes/teachers');
const usersRouter = require('./server/routes/users');
const signupRouter = require('./server/routes/signup');

// Mount the routers to the express app
app.use('/api/practices', practicesRouter);
app.use('/api/teachers', teachersRouter);
app.use('/api/users', usersRouter);
app.use('/api/signup', signupRouter);

// Static toute to /public
app.use("/api", express.static(path.resolve(__dirname, 'public')));

// Start server
app.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
});
