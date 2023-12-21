const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management System',
    },
  },
  // Path to the API routes
  apis: ['./routes/*.js'], // replace with the path to your route files
};

const openapiSpec = swaggerJSDoc(options);

module.exports = openapiSpec;
