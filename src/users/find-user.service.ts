import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUsersService {
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
