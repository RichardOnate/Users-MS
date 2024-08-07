import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de usuario',
    default: 'John',
    minimum: 4,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Contraseña del usuario',
    default: '12345678',
    minimum: 8,
  })
  password: string;
}
