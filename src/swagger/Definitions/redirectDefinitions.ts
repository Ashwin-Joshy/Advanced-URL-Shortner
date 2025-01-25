const redirectSwagger = {
    '/api/redirect-example': {
      get: {
        summary: 'Redirect Example',
        description: 'Redirects the user to a new page when executed.',
        responses: {
          302: {
            description: 'Redirects to a new page.',
            headers: {
              Location: {
                description: 'The URL to which the client should be redirected.',
                schema: {
                  type: 'string',
                  example: 'https://example.com/new-page',
                },
              },
            },
          },
        },
      },
    },
  };
  
  export default redirectSwagger;
  