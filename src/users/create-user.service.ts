import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  createUser(createUserDto: any) {
    return 'This action adds a new user';
  }
}
