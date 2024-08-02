import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './create-user.service';
import { FindUsersService } from './find-user.service';
import { UpdateUserService } from './update-user.service';
import { DeleteUserService } from './delete-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
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
