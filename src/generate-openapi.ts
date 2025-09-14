import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function generateOpenAPI() {
  try {
    const app = await NestFactory.create(AppModule, { logger: false });

    const config = new DocumentBuilder()
      .setTitle('Luxurad API')
      .setDescription('Luxurad API documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

    await app.close();

    console.log('✅ OpenAPI spec generated successfully!');
  } catch (err) {
    console.error('❌ Failed to generate OpenAPI spec:');
    console.error(err);
    process.exit(1);
  }
}

generateOpenAPI();
