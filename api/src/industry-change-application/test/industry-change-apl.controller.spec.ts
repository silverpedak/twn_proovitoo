import { Test, TestingModule } from '@nestjs/testing';

import { IndustryChangeApplicationController } from '../industry-change-apl.controller';
import {
  CreateIndustryChangeDto,
  DeleteIndustryChangeDto,
  GetIndustryChangeDto,
  IndustryChangeDto,
  QueryIndustryChangeApplicationDto,
} from '../dtos';
import { IndustryChangeApplicationService } from '../industry-change-apl.service';
import { industryChangeApplicationStub } from './stubs';

describe('IndustryChangeApplicationController', () => {
  let controller: IndustryChangeApplicationController;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByQuery: jest.fn(),
      delete: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndustryChangeApplicationController],
      providers: [
        {
          provide: IndustryChangeApplicationService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<IndustryChangeApplicationController>(
      IndustryChangeApplicationController,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    let response: IndustryChangeDto;
    const dto = new CreateIndustryChangeDto();
    const stub = industryChangeApplicationStub();

    beforeEach(async () => {
      serviceMock.create.mockResolvedValue(stub);
      response = await controller.create(dto);
    });

    it('is calling create method', async () => {
      expect(serviceMock.create).toHaveBeenCalledWith(dto);
    });

    it('returns IndustryChangeApplicationDto', () => {
      expect(response).toEqual(stub);
    });
  });

  describe('findById', () => {
    let response: IndustryChangeDto;
    const dto = new GetIndustryChangeDto();
    const stub = industryChangeApplicationStub();

    beforeEach(async () => {
      serviceMock.findById.mockResolvedValue([stub]);
      response = await controller.findById(dto);
    });

    it('is calling findById method', () => {
      expect(serviceMock.findById).toHaveBeenCalledWith(dto.id);
    });

    it('returns IndustryChangeApplicationDto[]', () => {
      expect(response).toEqual([stub]);
    });
  });

  describe('findByQuery', () => {
    let response: IndustryChangeDto[];
    const dto = new QueryIndustryChangeApplicationDto();
    const stub = industryChangeApplicationStub();

    beforeEach(async () => {
      serviceMock.findByQuery.mockResolvedValue([stub]);
      response = await controller.findByQuery(dto);
    });

    it('is calling findByQuery method', () => {
      expect(serviceMock.findByQuery).toHaveBeenCalledWith(dto);
    });

    it('returns IndustryChangeApplicationDto[]', () => {
      expect(response).toEqual([stub]);
    });
  });

  describe('delete', () => {
    let response: IndustryChangeDto[];
    const dto = new DeleteIndustryChangeDto();
    const stub = industryChangeApplicationStub();

    beforeEach(async () => {
      serviceMock.delete.mockResolvedValue([stub]);
      response = await controller.delete(dto);
    });

    it('is calling delete method', () => {
      expect(serviceMock.delete).toHaveBeenCalled();
    });

    it('is returning a IndustryChangeApplicationDto[]', () => {
      expect(response).toEqual([stub]);
    });
  });
});
