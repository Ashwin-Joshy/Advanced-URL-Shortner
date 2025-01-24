import { SwaggerOptions } from "swagger-ui-express";
import mainDefinitions from "./Definitions/mainDefinitions";
import authSwagger from "./Definitions/authDefinitions";
import authDefinitions from "./Definitions/authDefinitions";

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', 
        description: 'Local server',
      },
    ],
    paths: {
      ...authDefinitions,
      ...mainDefinitions
    },
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerOptions;
