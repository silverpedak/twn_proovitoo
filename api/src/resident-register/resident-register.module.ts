import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResidentRegisterService } from './resident-register.service';
import { ResidentRegisterController } from './resident-register.controller';
import { ResidentSchema } from './schemas/resident.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Resident', schema: ResidentSchema }]),
  ],
  controllers: [ResidentRegisterController],
  providers: [ResidentRegisterService],
  exports: [ResidentRegisterService],
})
export class ResidentRegisterModule {}
