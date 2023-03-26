import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationNotFoundException extends HttpException {
  constructor() {
    super('application not found', HttpStatus.NOT_FOUND);
  }
}
