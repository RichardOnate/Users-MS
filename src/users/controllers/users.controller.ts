import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import { FindUsersService } from '../services/find-user.service';
import { UpdateUserService } from '../services/update-user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.findUsersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
