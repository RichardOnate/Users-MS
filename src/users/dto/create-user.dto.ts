import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Rol del usuario',
    default: 'user',
  })
  role: string;
}
