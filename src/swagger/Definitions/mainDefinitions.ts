const mainDefinitions = {
    '/example': {
      get: {
        summary: 'Example endpoint',
        description: 'An example endpoint to demonstrate Swagger documentation.',
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: 'Example successful response',
                },
              },
            },
          },
        },
      },
    },
  };
  
  export default mainDefinitions;
  