import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { AuthController } from 'src/auth/auth.controller';

// 👇 create mock services that don't touch DB
class DummyUsersService {}
class DummyAuthService {}

@Module({
  controllers: [UsersController, AuthController],
  providers: [
    { provide: 'UsersService', useClass: DummyUsersService },
    { provide: 'AuthService', useClass: DummyAuthService },
  ],
})
export class DocsModule {}
