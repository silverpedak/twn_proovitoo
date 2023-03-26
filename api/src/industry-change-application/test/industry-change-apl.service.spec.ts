import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { IndustryChangeApplicationService } from '../industry-change-apl.service';
import { IndustryChangeApplication } from '../schemas';
import { Resident } from 'src/resident-register/schemas';
import {
  IndustryChangeApplicationStatus,
  ObjectStatusIndChangeApl,
  ResidentStatus,
  TypeOfRegistration,
} from 'src/common/constants/enums';
import { industryChangeApplicationStub } from './stubs';
import {
  CreateIndustryChangeDto,
  QueryIndustryChangeApplicationDto,
} from '../dtos';
import {
  calculateApplicationStatus,
  createNewIndustryChangeApplication,
} from '../utils';
import {
  ApplicationsNotFoundException,
  ApplicationMatchCurrentException,
  ApplicationNotFoundException,
  ResidencyNotValidException,
  ResidentInactiveException,
} from '../exceptions';
import { ResidentNotFoundException } from 'src/resident-register/exceptions';
import { residentStub } from 'src/resident-register/test';

describe('IndustryChangeApplicationService', () => {
  let service: IndustryChangeApplicationService;
  let industryChangeModelMock: any;
  let residentModelMock: any;

  beforeEach(async () => {
    industryChangeModelMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };
    residentModelMock = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndustryChangeApplicationService,
        {
          provide: getModelToken(IndustryChangeApplication.name),
          useValue: industryChangeModelMock,
        },
        {
          provide: getModelToken(Resident.name),
          useValue: residentModelMock,
        },
      ],
    }).compile();

    service = module.get<IndustryChangeApplicationService>(
      IndustryChangeApplicationService,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findById', () => {
    it('should return an IndustryChangeDto when the application is found and has the correct status', async () => {
      //act
      const application = industryChangeApplicationStub();
      industryChangeModelMock.findOne.mockResolvedValueOnce(application);
      //act
      const result = await service.findById(application.residentSub);
      //assert
      expect(industryChangeModelMock.findOne).toHaveBeenCalledWith({
        _id: application.residentSub,
      });
      expect(result).toEqual(application);
    });

    it('should throw ApplicationNotFoundException when status is not "CURRENT"', async () => {
      //arrange
      const application = industryChangeApplicationStub({
        objectStatus: ObjectStatusIndChangeApl.DELETED,
      });
      industryChangeModelMock.findOne.mockResolvedValueOnce(application);
      //assert
      await expect(service.findById(application.residentSub)).rejects.toThrow(
        new ApplicationNotFoundException(),
      );
      expect(industryChangeModelMock.findOne).toHaveBeenCalledWith({
        _id: application.residentSub,
      });
    });
  });

  describe('findByQuery', () => {
    it('should return an empty array when no applications are found', async () => {
      //arrange
      const queryRequest: QueryIndustryChangeApplicationDto = {
        residentSub: 'sub',
        statuses: [],
      };
      industryChangeModelMock.find.mockResolvedValueOnce([]);
      //act
      const result = await service.findByQuery(queryRequest);
      //assert
      expect(industryChangeModelMock.find).toBeCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should return an array of found applications', async () => {
      //arrange
      const query: QueryIndustryChangeApplicationDto = {
        residentSub: 'sub',
        statuses: [],
      };
      const applicationFound = industryChangeApplicationStub();
      industryChangeModelMock.find.mockResolvedValueOnce([applicationFound]);
      //act
      const result = await service.findByQuery(query);
      //assert
      expect(industryChangeModelMock.find).toBeCalledTimes(1);
      expect(result).toEqual([applicationFound]);
    });

    it('should return an array of found applications', async () => {
      //arrange
      const application = industryChangeApplicationStub();
      const query: QueryIndustryChangeApplicationDto = {
        residentSub: application.residentSub,
        statuses: [],
      };
      industryChangeModelMock.find.mockResolvedValueOnce([application]);
      //act
      const result = await service.findByQuery(query);
      //assert
      expect(industryChangeModelMock.find).toBeCalledTimes(1);
      expect(result).toEqual([application]);
    });
  });

  describe('create', () => {
    describe('error', () => {
      let createApplication: CreateIndustryChangeDto;

      beforeEach(() => {
        createApplication = {
          residentSub: 'mock-sub',
          willWorkInPhysicalJurisdiction: false,
        };
      });

      test('throws ResidentNotFoundException when resident not found with given sub', async () => {
        //arrange
        residentModelMock.findOne.mockResolvedValueOnce(null);
        //assert
        await expect(service.create(createApplication)).rejects.toThrow(
          ResidentNotFoundException,
        );
      });

      test('throws ResidencyNotValidException when residency is not "E_RESIDENCY" or "RESIDENCY"', async () => {
        //arrange
        const residentFound = residentStub({
          typeOfRegistration: TypeOfRegistration.LIMITED_E_RESIDENCY,
        });
        residentModelMock.findOne.mockResolvedValueOnce(residentFound);
        //assert
        await expect(service.create(createApplication)).rejects.toThrow(
          ResidencyNotValidException,
        );
      });

      test('throws ResidentInactiveException when resident status is "INACTIVE', async () => {
        //arrange
        const residentFound = residentStub({
          status: ResidentStatus.INACTIVE,
        });
        residentModelMock.findOne.mockResolvedValueOnce(residentFound);
        //assert
        await expect(service.create(createApplication)).rejects.toThrow(
          ResidentInactiveException,
        );
      });

      test('throws ApplicationMatchCurrentException when request matches current information', async () => {
        //arrange
        const residentFound = residentStub();
        residentModelMock.findOne.mockResolvedValueOnce(residentFound);
        createApplication.residentSub = residentFound.sub;
        createApplication.willWorkInPhysicalJurisdiction =
          residentFound.willWorkInPhysicalJurisdiction;
        createApplication.industry = residentFound.industry;
        createApplication.regulatoryElection = residentFound.regulatoryElection;
        createApplication.regulatoryElectionSub =
          residentFound.regulatoryElectionSub;
        //assert
        await expect(service.create(createApplication)).rejects.toThrow(
          ApplicationMatchCurrentException,
        );
      });
    });

    describe('success', () => {
      let createApplication: CreateIndustryChangeDto;

      beforeEach(() => {
        createApplication = {
          residentSub: residentStub().sub,
          willWorkInPhysicalJurisdiction: false,
        };
      });

      test('returns IndustrtChangeApplicationDto with status "APPROVED" when input params willWorkInPhysicalJurisdiction = false', async () => {
        //arrange
        createApplication.willWorkInPhysicalJurisdiction = false;
        const residentFound = residentStub({
          willWorkInPhysicalJurisdiction: true,
        });
        const applicationStatus = calculateApplicationStatus(
          createApplication.willWorkInPhysicalJurisdiction,
        );
        const application = createNewIndustryChangeApplication(
          residentFound,
          createApplication,
          applicationStatus,
        );
        industryChangeModelMock.create.mockResolvedValueOnce(application);
        residentModelMock.findOne.mockResolvedValueOnce(residentFound);
        //act
        const result = await service.create(createApplication);
        //assert
        expect(result.status).toEqual(IndustryChangeApplicationStatus.APPROVED);
      });

      test('returns IndustrtChangeApplicationDto with status "IN_REVIEW" when input params willWorkInPhysicalJurisdiction = true', async () => {
        //arrange
        createApplication.willWorkInPhysicalJurisdiction = true;
        const residentFound = residentStub({
          willWorkInPhysicalJurisdiction: true,
        });
        const applicationStatus = calculateApplicationStatus(
          createApplication.willWorkInPhysicalJurisdiction,
        );
        const application = createNewIndustryChangeApplication(
          residentFound,
          createApplication,
          applicationStatus,
        );
        industryChangeModelMock.create.mockResolvedValueOnce(application);
        residentModelMock.findOne.mockResolvedValueOnce(residentFound);
        //act
        const result = await service.create(createApplication);
        //assert
        expect(result.status).toEqual(
          IndustryChangeApplicationStatus.IN_REVIEW,
        );
      });

      test('updates resident details when status: "APPROVED"', async () => {
        //arrange
        createApplication.willWorkInPhysicalJurisdiction = false;
        const residentFound = residentStub({
          willWorkInPhysicalJurisdiction: true,
        });
        const applicationStatus = calculateApplicationStatus(
          createApplication.willWorkInPhysicalJurisdiction,
        );
        const application = createNewIndustryChangeApplication(
          residentFound,
          createApplication,
          applicationStatus,
        );
        industryChangeModelMock.create.mockResolvedValueOnce(application);
        residentModelMock.findOne.mockResolvedValueOnce(residentFound);
        await service.create(createApplication);
        //assert
        expect(residentModelMock.findOneAndUpdate).toBeCalledTimes(1);
      });
    });
  });

  describe('delete', () => {
    let ids = ['1', '2'];

    it('should throw ApplicationsNotFoundException when no applications were found', async () => {
      //arrange
      industryChangeModelMock.findOneAndUpdate.mockResolvedValue(null);
      //assert
      await expect(service.delete(ids)).rejects.toThrow(
        ApplicationsNotFoundException,
      );
      expect(industryChangeModelMock.findOneAndUpdate).toBeCalledTimes(2);
    });

    it('should return IndustryChangeDto[] when resolved', async () => {
      //arrange
      const stub = industryChangeApplicationStub();
      industryChangeModelMock.findOneAndUpdate.mockResolvedValue(stub);
      //act
      const result = await service.delete(ids);
      //assert
      expect(result).toEqual([stub, stub]);
      expect(industryChangeModelMock.findOneAndUpdate).toBeCalledTimes(2);
    });
  });
});
