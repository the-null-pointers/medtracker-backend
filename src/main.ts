import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Specify allowed origins or use '*' for all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    credentials: true, // Allow cookies with CORS
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        if (!Array.isArray(errors)) {
          return new BadRequestException({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
        }
        // Create an object to hold the formatted errors
        // Create an object to hold the formatted errors
        const formattedErrors = errors.reduce((acc, error) => {
          // Check if the error has children
          if (error.children && error.children.length > 0) {
            // Initialize the property in the accumulator
            acc[error.property] = acc[error.property] || {};

            // Populate the errors for each child
            error.children.forEach((childError) => {
              acc[error.property][childError.property] = Object.values(
                childError.constraints,
              );
            });
          } else {
            // If no children, just push the constraints to the property directly
            acc[error.property] = Object.values(error.constraints);
          }
          return acc;
        }, {}); // Start with an empty object

        return new BadRequestException({
          statusCode: 400,
          status: 'failure',
          message: 'Bad request', // Return the formatted errors as an object
          error: formattedErrors,
        });
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Your Project API')
    .setDescription('API documentation for Your Project')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }) // Optional, for JWT auth setup
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module at '/api-docs'
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
