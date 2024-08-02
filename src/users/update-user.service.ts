import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserService {
  updateUser(updateUserDto: any) {
    return 'This action update a existing user';
  }
}
