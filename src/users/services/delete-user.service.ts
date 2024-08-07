import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/users.schema';

@Injectable()
export class DeleteUserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async deleteUser(id: string) {
    const deletedUser = await this.userModel
      .updateOne({ _id: id }, { $set: { active: false } })
      .exec();

    if (deletedUser.matchedCount === 0) {
      throw new NotFoundException('User not found');
    }

    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}
