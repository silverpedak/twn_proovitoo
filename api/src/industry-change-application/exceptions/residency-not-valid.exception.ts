import { HttpException, HttpStatus } from '@nestjs/common';

export class ResidencyNotValidException extends HttpException {
  constructor() {
    super(
      'residency must be either "E_RESIDENCY" or "RESIDENCY"',
      HttpStatus.NOT_FOUND,
    );
  }
}
