import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function generateOpenAPI() {
  try {
    console.log('🚀 Starting OpenAPI generation...');
    console.log('NO_DB flag:', process.env.NO_DB);

    const app = await NestFactory.create(AppModule, { logger: false });
    console.log('✅ Nest app created');

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
  } catch (err) {
    console.error('❌ Failed to generate OpenAPI spec:');
    console.error(err);
    process.exit(1);
  }
}

generateOpenAPI();
