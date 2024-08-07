import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre completo del usuario',
    default: 'John',
    minimum: 4,
  })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Apellidos del usuario',
    default: 'Doe',
    minimum: 3,
  })
  lastName: string;

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

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
  @ApiProperty({
    description: 'Email del usuario',
    default: 'prueba@prueba.cl',
  })
  email: string;
}
