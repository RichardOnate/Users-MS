import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/users.schema';

@Injectable()
export class FindUsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error finding users');
    }
  }

  async findOne(name: string) {
    try {
      const user = await this.userModel.findOne({ username: name }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async checkUserExists(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    return !!user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const mail = await this.userModel.findOne({ email }).exec();
    return !!mail;
  }
}
