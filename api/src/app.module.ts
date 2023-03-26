import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IndustryChangeApplicationModule } from './industry-change-application/industry-change-apl.module';

import { ResidentRegisterModule } from './resident-register/resident-register.module';

const MONGO_URI = 'mongodb://localhost:27017/resident-register';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    IndustryChangeApplicationModule,
    ResidentRegisterModule,
  ],
})
export class AppModule {}
