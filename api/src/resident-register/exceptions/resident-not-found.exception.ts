import { HttpException, HttpStatus } from '@nestjs/common';

export class ResidentNotFoundException extends HttpException {
  constructor() {
    super('resident not found', HttpStatus.NOT_FOUND);
  }
}
