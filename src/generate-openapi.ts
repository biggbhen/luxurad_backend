// generate-openapi.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // or all controllers
import { AppModule } from './app.module'; // fallback
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [], // leave out DB modules
  controllers: [AppController, UsersController, AuthController], // add all controllers you want in docs
  providers: [],
})
class OpenApiModule {}

async function generateOpenAPI() {
  // use OpenApiModule instead of AppModule to avoid DB
  const app = await NestFactory.create(OpenApiModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Luxurad API')
    .setDescription('Luxurad API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

  await app.close();
}

generateOpenAPI();
