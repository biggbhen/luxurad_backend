import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Model, ModelCtor } from 'sequelize-typescript';
import { AuthModule } from './auth/auth.module';

console.log('NO_DB:', process.env.NO_DB);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ...(process.env.NO_DB?.toLowerCase() === 'true'
      ? []
      : [
          SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              interface DatabaseConfig {
                host: string;
                port: number;
                username: string;
                password: string;
                name: string;
              }
              const dbConfig = configService.get<DatabaseConfig>('database');
              if (!dbConfig) {
                throw new Error('Database configuration is missing');
              }
              return {
                dialect: 'mysql',
                host: dbConfig.host,
                port: dbConfig.port,
                username: dbConfig.username,
                password: dbConfig.password,
                models: [User as ModelCtor<Model>],
                autoLoadModels: true,
                logging: true,
                database: dbConfig.name,
                synchronize: true,
              };
            },
          }),
        ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
