import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResidentRegisterService } from './resident-register.service';
import { Resident } from './schemas/resident.schema';

@Controller('resident-register')
export class ResidentRegisterController {
  constructor(private readonly residentService: ResidentRegisterService) {}

  @Get()
  async getAllResidents(): Promise<Resident[]> {
    return this.residentService.findAll();
  }

  @Get(':id')
  async findResidentById(@Param('id') id: string): Promise<Resident | null> {
    return this.residentService.findBySub(id);
  }

  @Post()
  async createResident(
    @Body()
    resident: Resident,
  ): Promise<Resident> {
    return this.residentService.create(resident);
  }
}
