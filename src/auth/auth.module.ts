import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CreateUserService } from 'src/users/services/create-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';
import { FindUsersService } from 'src/users/services/find-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CreateUserService, FindUsersService],
})
export class AuthModule {}
