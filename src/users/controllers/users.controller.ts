import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import { FindUsersService } from '../services/find-user.service';
import { UpdateUserService } from '../services/update-user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesType } from 'src/shared/enum/roles.enum';
import { JwtAuthGuard } from 'src/auth/guard/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guard/authorization.guard';

@Roles([RolesType.ADMIN])
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AuthorizationGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un nuevo usuario.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Crea un nuevo usuario. Retorna un objeto con la información del usuario creado.',
    type: CreateUserDto,
    schema: {
      $ref: getSchemaPath(CreateUserDto),
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna todos los usuarios.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Retorna una lista de objetos con la información de todos los usuarios.',
  })
  findAll() {
    return this.findUsersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un usuario.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Elimina el usuario con el identificador proporcionado, aplicando el borrado lógico.',
  })
  async remove(@Param('id') id: string) {
    return await this.deleteUserService.deleteUser(id);
  }
}
