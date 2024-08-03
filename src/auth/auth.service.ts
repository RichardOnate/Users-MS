import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserService } from 'src/users/services/create-user.service';

@Injectable()
export class AuthService {
  constructor(private readonly createUser: CreateUserService) {}
  async register(createUserDto: CreateUserDto) {
    return await this.createUser.createUser(createUserDto);
  }
}
