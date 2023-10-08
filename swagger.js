const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Tacnique Task Managment API",
      version: "1.0.0",
      description: "The Swagger Documentation of Tacnique Task Managment API",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development Server",
      },
      {
        url: "https://tacniques-task-managment.onrender.com",
        description: "Deployed Server",
      },
    ],
  },
  apis: ["./swagger.yaml"],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
