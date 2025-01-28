const mainDefinitions = {
  '/shorten': {
    post: {
      summary: 'Create a shortened URL',
      description: 'Generates a shortened URL for the provided original URL. Optionally, a custom alias and topic can be specified.',
      operationId: 'createShortUrl',
      tags: ['Main'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  format: 'uri',
                  description: 'The original URL to be shortened.',
                  example: 'https://www.example.com',
                },
                customAlias: {
                  type: 'string',
                  description: 'An optional custom alias for the shortened URL.',
                  example: 'my-custom-alias',
                },
                topic: {
                  type: 'string',
                  description: 'The topic associated with the URL. Defaults to "General".',
                  example: 'Technology',
                },
              },
              required: ['url'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Successfully created a shortened URL.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  shortUrl: {
                    type: 'string',
                    description: 'The shortened URL.',
                    example: 'http://short.url/my-custom-alias',
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'The timestamp when the shortened URL was created.',
                    example: '2023-10-01T12:00:00Z',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Bad request due to missing or invalid parameters.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  isSuccess: {
                    type: 'boolean',
                    example: false,
                  },
                  error: {
                    type: 'string',
                    example: 'URL is required.',
                  },
                },
              },
            },
          },
        },
        '409': {
          description: 'Conflict due to alias already in use.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  isSuccess: {
                    type: 'boolean',
                    example: false,
                  },
                  error: {
                    type: 'string',
                    example: 'Alias is already in use.',
                  },
                },
              },
            },
          },
        },
        '500': {
          description: 'Internal server error.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'An error occurred while processing your request.',
                  },
                  isSuccess: {
                    type: 'boolean',
                    example: false,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
'/shorten/{url}': {
  get: {
    summary: 'Get Original URL',
      description: 'Redirects to the original URL based on the provided shortened URL \n\n **Important:**You must visit this URL in your browser to get redirected to Original URL',
      tags: ['Main'],  
      operationId: 'getShortenUrl',
          parameters: [
            {
              name: 'url',
              in: 'path',
              required: true,
              description: 'The shortened URL to be expanded',
              schema: {
                type: 'string',
              },
            },
          ],
            responses: {
      '301': {
        description: 'Redirects to the original URL.',
        },
      '400': {
        description: 'Invalid or missing shortened URL.',
          content: {
          'application/json': {
            schema: {
              type: 'object',
                properties: {
                isSuccess: {
                  type: 'boolean',
                    example: false,
                  },
                error: {
                  type: 'string',
                    example: 'shortUrl is required.',
                  },
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal server error.',
          content: {
          'application/json': {
            schema: {
              type: 'object',
                properties: {
                error: {
                  type: 'string',
                    example: 'An error occurred while processing your request.',
                  },
                isSuccess: {
                  type: 'boolean',
                    example: false,
                  },
              },
            },
          },
        },
      },
    },
  },
},
};

export default mainDefinitions;
