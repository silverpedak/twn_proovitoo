import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationsNotFoundException extends HttpException {
  constructor(idsNotFound: string[]) {
    super(
      `applications with IDs ${idsNotFound.join(', ')} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
