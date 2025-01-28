const authDefinitions = {
  '/auth/google': {
    get: {
      summary: 'Google Authentication',
      description: 'Redirects to Google for authentication.',
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
    '/auth/login': {
      post: {
        summary: 'User login',
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
          summary: 'User signup',
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
  },
  '/auth/google/callback': {
    get: {
      summary: 'Google Authentication Callback',
      description: 'Handles the callback from Google after authentication.',
      tags: ['Authentication'], 
      responses: {
        302: {
          description: 'Redirects to profile after successful authentication',
        },
        401: {
          description: 'Unauthorized if authentication fails',
        },
      },
    },
  },
  };
  export default authDefinitions;