const express = require("express");
const app = express();
const path = require('path');

//load env value and package
require('dotenv').config()

// update to get port from env in expressjs
let port = process.env.PORT || 3000;

// Configure database
const db = require('./config/db');
db.connect();

//handle cors ind app expressjs
const cors = require('cors')
app.use(cors())

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const task_route = require('./routes/task');
app.use('/api/task', task_route);

const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./open_api');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});