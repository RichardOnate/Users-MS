import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserService {
  delete(id: number) {
    return `This action removes a #${id} user`;
  }
}