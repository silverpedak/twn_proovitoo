import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { IndustryChangeApplicationModule } from './industry-change-application/industry-change-apl.module';
import { ActiveResidencyConstraint } from './industry-change-application/validators/is-active-residency.validator';
// import { ExistingApplicationConstraint } from './industry-change-application/validators/is-existing-application.validator';

import { ResidentRegisterModule } from './resident-register/resident-register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DB_URI || 'mongodb://localhost:27017/resident-register',
    ),
    IndustryChangeApplicationModule,
    ResidentRegisterModule,
  ],
  providers: [
    ActiveResidencyConstraint,
    // ExistingApplicationConstra int,
  ],
})
export class AppModule {}
