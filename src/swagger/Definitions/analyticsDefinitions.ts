const analyticsDefinitions = {
    '/{alias}': {
    get: {
      summary: 'Get analytics data for a specific short URL alias',
      description: 'Retrieves log data for the specified short URL alias and processes it to return relevant analytics.',
      operationId: 'getAliasAnalytics',
      tags: ['Analytics'],
      parameters: [
        {
          name: 'alias',
          in: 'path',
          required: true,
          description: 'The alias of the short URL for which analytics data is requested.',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successfully retrieved analytics data for the specified alias.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  totalClicks: {
                    type: 'integer',
                    description: 'Total number of times the short URL has been accessed.',
                    example: 120,
                  },
                  uniqueUsers: {
                    type: 'integer',
                    description: 'Number of unique users who accessed the short URL.',
                    example: 80,
                  },
                  clicksByDate: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: {
                          type: 'string',
                          format: 'date',
                          description: 'The date for which the click count is recorded (considering the recent 7 days).',
                          example: '2023-10-01',
                        },
                        clickCount: {
                          type: 'integer',
                          description: 'Total click count for that date.',
                          example: 30,
                        },
                      },
                    },
                  },
                  osType: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        osName: {
                          type: 'string',
                          description: 'The name of the operating system (e.g., Windows, macOS, Linux, iOS, Android).',
                          example: 'Windows',
                        },
                        uniqueClicks: {
                          type: 'integer',
                          description: 'Number of unique clicks for that OS.',
                          example: 50,
                        },
                        uniqueUsers: {
                          type: 'integer',
                          description: 'Number of unique users for that OS.',
                          example: 30,
                        },
                      },
                    },
                  },
                  deviceType: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        deviceName: {
                          type: 'string',
                          description: 'The type of device used (e.g., mobile, desktop).',
                          example: 'Mobile',
                        },
                        uniqueClicks: {
                          type: 'integer',
                          description: 'Number of unique clicks for that device type.',
                          example: 70,
                        },
                        uniqueUsers: {
                          type: 'integer',
                          description: 'Number of unique users for that device type.',
                          example: 40,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '404': {
          description: 'Alias not found or no data available for the specified alias.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'No data found for the specified alias.',
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
    '/topic/{topic}': {
        get: {
          summary: 'Get analytics data for a specific topic',
          description: 'Retrieves log data for the specified topic and processes it to return relevant analytics.',
          operationId: 'getTopicAnalytics',
          tags: ['Analytics'],
          parameters: [
            {
              name: 'topic',
              in: 'path',
              required: true,
              description: 'The topic for which analytics data is requested.',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successfully retrieved analytics data for the specified topic.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalClicks: {
                        type: 'integer',
                        description: 'Total number of clicks across all URLs in the specified topic.',
                        example: 150,
                      },
                      uniqueUsers: {
                        type: 'integer',
                        description: 'Number of unique users who accessed URLs in the specified topic.',
                        example: 75,
                      },
                      clicksByDate: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            date: {
                              type: 'string',
                              format: 'date',
                              description: 'The date for which the click count is recorded.',
                              example: '2023-10-01',
                            },
                            totalClicks: {
                              type: 'integer',
                              description: 'Total click counts for all URLs on that date.',
                              example: 30,
                            },
                          },
                        },
                      },
                      urls: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            shortUrl: {
                              type: 'string',
                              description: 'The generated short URL.',
                              example: 'http://short.url/my-custom-alias',
                            },
                            totalClicks: {
                              type: 'integer',
                              description: 'Total number of clicks for the short URL.',
                              example: 100,
                            },
                            uniqueUsers: {
                              type: 'integer',
                              description: 'Number of unique users who accessed the short URL.',
                              example: 50,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Topic not found or no data available for the specified topic.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'No data found for the specified topic.',
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
    '/overall': {
      get: {
        summary: 'Get overall analytics for the user',
        description: 'Retrieves overall analytics data for the authenticated user, including the total number of URLs, OS types, Device Types.',
        operationId: 'getOverallAnalytics',
        tags: ['Analytics'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
            '200': {
              description: 'Successfully retrieved overall analytics data.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalUrls: {
                        type: 'integer',
                        description: 'Total number of short URLs created by the user.',
                        example: 5,
                      },
                      totalClicks: {
                        type: 'integer',
                        description: 'Total number of clicks across all URLs created by the user.',
                        example: 150,
                      },
                      uniqueUsers: {
                        type: 'integer',
                        description: 'Total number of unique users who accessed any of the user\'s short URLs.',
                        example: 100,
                      },
                      clicksByDate: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            date: {
                              type: 'string',
                              format: 'date',
                              description: 'The date for which the click count is recorded.',
                              example: '2023-10-01',
                            },
                            totalClicks: {
                              type: 'integer',
                              description: 'Total click counts for all URLs on that date.',
                              example: 30,
                            },
                          },
                        },
                      },
                      osType: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            osName: {
                              type: 'string',
                              description: 'The name of the operating system (e.g., Windows, macOS, Linux, iOS, Android).',
                              example: 'Windows',
                            },
                            uniqueClicks: {
                              type: 'integer',
                              description: 'Number of unique clicks for that OS.',
                              example: 80,
                            },
                            uniqueUsers: {
                              type: 'integer',
                              description: 'Number of unique users for that OS.',
                              example: 50,
                            },
                          },
                        },
                      },
                      deviceType: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            deviceName: {
                              type: 'string',
                              description: 'The type of device used (e.g., mobile, desktop).',
                              example: 'Mobile',
                            },
                            uniqueClicks: {
                              type: 'integer',
                              description: 'Number of unique clicks for that device type.',
                              example: 70,
                            },
                            uniqueUsers: {
                              type: 'integer',
                              description: 'Number of unique users for that device type.',
                              example: 40,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'Unauthorized access due to missing or invalid token.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Unauthorized access.',
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
  
  export default analyticsDefinitions;