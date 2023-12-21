const express = require("express");
const app = express();

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

app.get("/", (request, response) => {
    response.send("Hi there");
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const sampleRoute = require('./routes/sampleRoute');
app.use('/api/sample', sampleRoute);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});