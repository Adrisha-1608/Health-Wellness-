import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health and Wellness API',
      version: '1.0.0',
      description: 'API for Health & Wellness App',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Change to your actual server URL/port
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/doc/**/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);

// Function to setup swagger in app.ts
export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
