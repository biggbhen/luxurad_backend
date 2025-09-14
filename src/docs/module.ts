import { Module } from '@nestjs/common';
import { AuthDocsModule } from 'src/auth/docs/module';
import { UsersDocsModule } from 'src/users/docs/module';

@Module({
  imports: [UsersDocsModule, AuthDocsModule],
})
export class DocsModule {}
