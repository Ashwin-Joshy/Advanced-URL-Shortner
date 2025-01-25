import { SwaggerOptions } from "swagger-ui-express";
import mainDefinitions from "./Definitions/mainDefinitions";
import authSwagger from "./Definitions/authDefinitions";
import authDefinitions from "./Definitions/authDefinitions";
import redirectSwagger from "./Definitions/redirectDefinitions";

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
      ...mainDefinitions,
      ...redirectSwagger
    },
    components: {
      securitySchemes: {
        googleOAuth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
              tokenUrl: 'https://oauth2.googleapis.com/token',
              scopes: {
                'https://www.googleapis.com/auth/userinfo.email': 'Access email address',
                'https://www.googleapis.com/auth/userinfo.profile': 'Access basic profile info',
              },
            },
          },
        },
      },
    },
    security: [
      {
        googleAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerOptions;
