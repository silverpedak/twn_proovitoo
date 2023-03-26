import { HttpException, HttpStatus } from '@nestjs/common';

export class ResidentInactiveException extends HttpException {
  constructor() {
    super('resident status "INACTIVE"', HttpStatus.FORBIDDEN);
  }
}
