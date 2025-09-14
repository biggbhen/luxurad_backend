import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { DocsModule } from './docs/module';
import { INestApplication } from '@nestjs/common';


async function generateOpenAPI() {
  console.log('🚀 Starting OpenAPI generation...');

  const app = (await NestFactory.create(DocsModule, {
    logger: false,
  }));

  console.log('✅ Nest app created (DocsModule only)');

  const config = new DocumentBuilder()
    .setTitle('Luxurad API')
    .setDescription('Luxurad API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  console.log('✅ Swagger document created');

  writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  console.log('✅ OpenAPI spec written to openapi.json');

  await app.close();
  console.log('🎉 OpenAPI generation finished successfully!');
}

generateOpenAPI();
