import { SwaggerOptions } from "swagger-ui-express";
import mainDefinitions from "./Definitions/mainDefinitions";
import authDefinitions from "./Definitions/authDefinitions";
import analyticsDefinitions from "./Definitions/analyticsDefinitions";

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Advanced URL Shortener',
      version: '1.0.0',
      description: 'An advanced URL shortner that helps you shorten you urls and get analytics as you need',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', 
        description: 'Local server',
      },
    ],
    paths: {
      ...authDefinitions,
      ...mainDefinitions,
      ...analyticsDefinitions,
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
        // googleOAuth: {
        //   type: 'oauth2',
        //   flows: {
        //     authorizationCode: {
        //       authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        //       tokenUrl: 'https://oauth2.googleapis.com/token',
        //       scopes: {
        //         'https://www.googleapis.com/auth/userinfo.email': 'Access email address',
        //         'https://www.googleapis.com/auth/userinfo.profile': 'Access basic profile info',
        //       },
        //     },
        //   },
        // },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
      {
        googleAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerOptions;
