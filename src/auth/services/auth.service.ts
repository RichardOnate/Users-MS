import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserService } from 'src/users/services/create-user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUsersService } from 'src/users/services/find-user.service';
import { compare } from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { RolesType } from 'src/shared/enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findUser: FindUsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = { ...registerDto, role: RolesType.USER };
    const userCreated = await this.createUser.createUser(user);

    const payload = {
      sub: userCreated._id,
      username: userCreated.username,
      role: userCreated.role,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.findUser.findOne(username);
    const checkPassword = await compare(password, user.password);

    if (!user || !checkPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };

    const token = this.jwtService.sign(payload);
    return { token };
  }
}
