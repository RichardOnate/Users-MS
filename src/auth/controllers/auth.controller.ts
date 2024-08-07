import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Permite el registro de un nuevo usuario',
  })
  @ApiResponse({
    status: 202,
    description:
      'Registra un nuevo usuario y retorna un token de autenticación',
    type: RegisterDto,
    schema: {
      $ref: getSchemaPath(RegisterDto),
    },
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Permite el acceso a un usuario.',
  })
  @ApiResponse({
    status: 202,
    description: 'Permite el acceso a un usuario, devolviendo un token.',
    type: RegisterDto,
    schema: {
      $ref: getSchemaPath(LoginDto),
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
