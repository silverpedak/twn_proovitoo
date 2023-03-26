import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Resident, ResidentDocument } from './schemas/resident.schema';

@Injectable()
export class ResidentRegisterService {
  constructor(
    @InjectModel(Resident.name)
    private residentModel: Model<ResidentDocument>,
  ) {}

  async findAll(): Promise<Resident[]> {
    return await this.residentModel.find();
  }

  async findBySub(sub: string): Promise<Resident | null> {
    return await this.residentModel.findOne({ sub });
  }

  async findByQuery(
    queryParams: FilterQuery<Resident>,
  ): Promise<Resident | null> {
    const resident = await this.residentModel.findOne(queryParams).exec();
    return resident;
  }

  async create(resident: Resident): Promise<Resident> {
    return await this.residentModel.create(resident);
  }
}
