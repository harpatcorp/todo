const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo App API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./controllers/*.js'],
};

module.exports = options