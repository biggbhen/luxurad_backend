import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    // only bring in modules with controllers you want documented
    UsersModule,
    AuthModule,
  ],
})
export class DocsModule {}
