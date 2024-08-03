import { Module } from '@nestjs/common';

import { CreateUserService } from './services/create-user.service';
import { FindUsersService } from './services/find-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    FindUsersService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
