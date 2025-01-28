const authDefinitions = {
  '/auth/google': {
    get: {
      summary: 'Google Authentication (Login & SignUp)',
      description: 'Redirects to Google for authentication. \n\n**Important:** You must visit this URL in your browser to obtain the token.\n\n Once token is obtained please paste the token as value of Bearer Auth after clicking Authorize button on top right \n\n **Make sure that you remove the quotes("") which token is contained**',
      tags: ['Authentication'], 
      security: [
        {
          googleOAuth: [],
        },
      ],
      responses: {
        302: {
          description: 'Redirects to Google for authentication',
        },
      },
    },
  },
  '/auth/login': {
      post: {
        summary: 'User login(Email & Password)',
        description: 'Endpoint for user authentication and login.',
        tags: ['Authentication'], 
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    description: 'The username of the user.',
                    example: 'johndoe',
                  },
                  password: {
                    type: 'string',
                    description: 'The user\'s password.',
                    example: 'password123',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Login successful.',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - Invalid credentials.',
          },
          500: {
            description: 'Internal server error.',
          },
        },
      },
    },
    '/auth/signup': {
        post: {
          summary: 'User signup(Email & Password)',
          description: 'Endpoint for new user registration.',
          tags: ['Authentication'], 
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      description: 'The desired username for the user.',
                      example: 'janedoe',
                    },
                    password: {
                      type: 'string',
                      description: 'The desired password for the user.',
                      example: 'securePassword123',
                    },
                    email: {
                      type: 'string',
                      description: 'The email address of the user.',
                      example: 'janedoe@example.com',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Signup successful.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'User successfully registered.',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad Request - Invalid input.',
            },
            500: {
              description: 'Internal server error.',
            },
          },
        },
      },
 
  };
  export default authDefinitions;