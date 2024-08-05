import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { FindUsersService } from './find-user.service';
import { StringUtils } from 'src/utils/string.utils';
import { RolesType } from 'src/shared/enum/roles.enum';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private readonly findUsersService: FindUsersService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, role } = createUserDto;
    await this.checkUserData(username, email);
    return await this.userSave(createUserDto, role);
  }

  async userSave(createUserDto: CreateUserDto, role: string) {
    const { fullName, lastName, password } = createUserDto;
    createUserDto.fullName = StringUtils.capitalize(fullName);
    createUserDto.lastName = StringUtils.capitalize(lastName);
    const encryptedPassword = await StringUtils.hashPassword(password);
    const newUser = new this.userModel({
      ...createUserDto,
      password: encryptedPassword,
      role,
      status: true,
    });
    return await newUser.save();
  }

  private async checkUserData(username: string, email: string) {
    const [existingUser, emailExists] = await Promise.all([
      this.findUsersService.checkUserExists(username),
      this.findUsersService.checkEmailExists(email),
    ]);

    if (existingUser) {
      throw new ConflictException('User already exists!');
    } else if (emailExists) {
      throw new ConflictException('Email already exists!');
    }
  }
}
