"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            if (!Array.isArray(errors)) {
                return new common_1.BadRequestException({
                    statusCode: 400,
                    message: 'Validation failed',
                    error: 'Bad Request',
                });
            }
            const formattedErrors = errors.reduce((acc, error) => {
                if (error.children && error.children.length > 0) {
                    acc[error.property] = acc[error.property] || {};
                    error.children.forEach((childError) => {
                        acc[error.property][childError.property] = Object.values(childError.constraints);
                    });
                }
                else {
                    acc[error.property] = Object.values(error.constraints);
                }
                return acc;
            }, {});
            return new common_1.BadRequestException({
                statusCode: 400,
                status: 'failure',
                message: 'Bad request',
                error: formattedErrors,
            });
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Med Tracker')
        .setDescription('API for med tracker codefest 2024 (The Null Pointers)')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map