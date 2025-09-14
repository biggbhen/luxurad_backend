import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'fs';
import { DocsModule } from './docs/module';

async function generateOpenAPI() {
  try {
    console.log('🚀 Starting OpenAPI generation...');

    console.log('Attempting to create Nest app with DocsModule...');
    const app = await NestFactory.create(DocsModule, {
      logger: ['error', 'warn'], // Log errors and warnings
    });
    console.log('✅ Nest app created (DocsModule only)');

    const config = new DocumentBuilder()
      .setTitle('Luxurad API')
      .setDescription('Luxurad API documentation')
      .setVersion('1.0')
      .build();

    console.log('Creating Swagger document...');
    const document = SwaggerModule.createDocument(app, config);
    console.log('✅ Swagger document created');

    mkdirSync('./docs', { recursive: true });
    writeFileSync('./docs/openapi.json', JSON.stringify(document, null, 2));
    console.log('✅ OpenAPI spec written to docs/openapi.json');

    await app.close();
    console.log('🎉 OpenAPI generation finished successfully!');
  } catch (error) {
    console.error(
      '❌ OpenAPI generation failed at NestFactory.create:',
      error.stack,
    );
    process.exit(1);
  }
}

generateOpenAPI();
