import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { IndustryChangeApplicationService } from './industry-change-apl.service';

import {
  DeleteIndustryChangeDto,
  GetIndustryChangeDto,
  QueryIndustryChangeApplicationDto,
  CreateIndustryChangeDto,
  IndustryChangeDto,
} from './dtos';

@Controller('resident-register/industry-change-application')
export class IndustryChangeApplicationController {
  constructor(
    private readonly industryChangeAplService: IndustryChangeApplicationService,
  ) {}

  @Post()
  async create(
    @Body()
    newIndustryChangeApplication: CreateIndustryChangeDto,
  ): Promise<IndustryChangeDto> {
    return await this.industryChangeAplService.create(
      newIndustryChangeApplication,
    );
  }

  @Get(':id')
  async findById(
    @Param() param: GetIndustryChangeDto,
  ): Promise<IndustryChangeDto> {
    return this.industryChangeAplService.findById(param.id);
  }

  @Get()
  async findByQuery(
    @Body()
    queryParams: QueryIndustryChangeApplicationDto,
  ): Promise<IndustryChangeDto[]> {
    return this.industryChangeAplService.findByQuery(queryParams);
  }

  @Delete()
  async delete(
    @Body()
    deleteRequest: DeleteIndustryChangeDto,
  ): Promise<IndustryChangeDto[]> {
    return this.industryChangeAplService.delete(deleteRequest.deleteIds);
  }
}
