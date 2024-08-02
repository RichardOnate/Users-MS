import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './create-user.service';
import { FindUsersService } from './find-user.service';
import { UpdateUserService } from './update-user.service';
import { DeleteUserService } from './delete-user.service';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserService,
    FindUsersService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
