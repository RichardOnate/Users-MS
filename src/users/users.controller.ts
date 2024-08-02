import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersService } from './find-user.service';
import { CreateUserService } from './create-user.service';
import { DeleteUserService } from './delete-user.service';
import { UpdateUserService } from './update-user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {}

  @Get()
  findAll() {
    return this.findUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
