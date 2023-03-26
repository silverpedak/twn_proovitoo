import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationMatchCurrentException extends HttpException {
  constructor() {
    super('request matches current data', HttpStatus.BAD_REQUEST);
  }
}
