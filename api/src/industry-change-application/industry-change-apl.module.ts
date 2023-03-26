import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resident, ResidentSchema } from 'src/resident-register/schemas';

import { IndustryChangeApplicationController } from './industry-change-apl.controller';
import { IndustryChangeApplicationService } from './industry-change-apl.service';
import {
  IndustryChangeApplication,
  IndustryChangeApplicationSchema,
} from './schemas/industry-change-apl.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndustryChangeApplication.name,
        schema: IndustryChangeApplicationSchema,
      },
      { name: Resident.name, schema: ResidentSchema },
    ]),
  ],
  controllers: [IndustryChangeApplicationController],
  providers: [IndustryChangeApplicationService],
  exports: [IndustryChangeApplicationService],
})
export class IndustryChangeApplicationModule {}
