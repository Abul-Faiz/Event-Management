const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()

const doc = {
  info: {
    title: 'Portfolio',
    description: 'Event Management',
    contact: {
      name: 'API Support',
      url: process.env.BASE_URL,
      email: 'abulfaiz428@gmail.com',
    },
    author: {
      name: 'Abul Faiz',    
      email: 'abulfaiz.doodleblue@gmail.com',
    },
    version: '1.0.0',
  },
  host: `${process.env.BASE_URL}`,
  schemes: process.env.PROTOCOL,
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Bearer Token',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['../router/user.route.js'];

swaggerAutogen(outputFile, routes, doc);
