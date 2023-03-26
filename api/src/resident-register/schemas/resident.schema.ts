import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Address } from 'src/common/interfaces';
import {
  Industry,
  RegulatoryElection,
  ResidentStatus,
  TypeOfRegistration,
  TypeOfRegistrationSub,
} from 'src/common/constants/enums';

export type ResidentDocument = HydratedDocument<Resident>;

@Schema()
export class Resident {
  @Prop({ required: true, unique: true })
  sub: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  permitNumber: number;

  @Prop()
  permitNumberQrCode?: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  countryOfBirth: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  citizenship: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true, type: Object })
  address: Address;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  typeOfRegistration: TypeOfRegistration;

  @Prop()
  typeOfRegistrationSub?: TypeOfRegistrationSub;

  @Prop()
  industry?: Industry;

  @Prop({ required: true })
  willWorkInPhysicalJurisdiction: boolean;

  @Prop()
  regulatoryElection?: RegulatoryElection;

  @Prop()
  regulatoryElectionSub?: string;

  @Prop({ required: true })
  firstRegistrationDate: Date;

  @Prop({ required: true })
  nextSubscriptionPaymentDate: Date;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: true })
  status: ResidentStatus;

  @Prop()
  residencyEndDate?: Date;
}

export const ResidentSchema = SchemaFactory.createForClass(Resident);
