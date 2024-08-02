import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { FindUsersService } from './find-user.service';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private readonly findUsersService: FindUsersService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    const [existingUser, emailExists] = await Promise.all([
      this.findUsersService.checkUserExists(username),
      this.findUsersService.checkEmailExists(email),
    ]);

    if (existingUser) {
      throw new ConflictException('User already exists!');
    } else if (emailExists) {
      throw new ConflictException('Email already exists!');
    }

    return await this.userSave(createUserDto);
  }

  async userSave(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }
}
