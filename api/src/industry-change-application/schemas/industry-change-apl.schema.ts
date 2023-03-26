import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  ObjectStatusIndChangeApl,
  IndustryChangeApplicationStatus,
} from 'src/common/constants/enums';
import {
  CurrentIndustry,
  RequestedIndustry,
  DecisionIndustryChangeApl,
} from 'src/common/interfaces';

export type IndustryChangeAplDocument =
  HydratedDocument<IndustryChangeApplication>;

@Schema()
export class IndustryChangeApplication {
  @Prop({ required: true })
  residentSub: string;

  @Prop({ required: true, type: Object })
  current: CurrentIndustry;

  @Prop({ required: true, type: Object })
  requested: RequestedIndustry;

  @Prop({ required: true })
  status: IndustryChangeApplicationStatus;

  @Prop({ type: Date })
  submittedAt?: Date;

  @Prop({ type: Object })
  decision?: DecisionIndustryChangeApl;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  createdBy?: string;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  updatedBy?: string;

  @Prop({ required: true })
  objectStatus: ObjectStatusIndChangeApl;
}

export const IndustryChangeApplicationSchema = SchemaFactory.createForClass(
  IndustryChangeApplication,
);
