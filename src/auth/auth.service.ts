import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserService } from 'src/users/services/create-user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { FindUsersService } from 'src/users/services/find-user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findUser: FindUsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const user = await this.createUser.createUser(createUserDto);
    const payload = {
      sub: user._id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.findUser.findOne(username);
    const checkPassword = await compare(password, user.password);

    if (!user || !checkPassword) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
