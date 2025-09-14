import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function generateOpenAPI() {
  console.log('🚀 Starting OpenAPI generation...');
  console.log('NO_DB flag:', process.env.NO_DB);

  let app;
  try {
    // 👇 Wrap NestFactory.create in try/catch
    app = await NestFactory.create(AppModule, { logger: false });
    console.log('✅ Nest app created');
  } catch (err) {
    console.error('❌ Failed during NestFactory.create(AppModule):');
    console.error(err);
    process.exit(1);
  }

  try {
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
    console.error('❌ Failed while creating Swagger doc:');
    console.error(err);
    process.exit(1);
  }
}

generateOpenAPI();
