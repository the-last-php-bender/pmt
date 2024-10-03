import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PMT',
      version: '1.0.0',
      description: 'An Api that helps company manage workers and task',
      contact: {
        name: 'The-Last-PHP-Bender',
        email: 'nwinyinyadavid123@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./api/docs/*.js'], 
});

export default swaggerSpec;
