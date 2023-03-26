import { ValidationPipeOptions } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class ConditionalConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (relatedValue) {
      return value !== null;
    } else {
      return value === null;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be null `;
  }
}

export function IsNullIfFalse(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // const options: ValidationPipeOptions = {
  //   stopAtFirstError: true,
  // };
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: ConditionalConstraint,
    });
  };
}
