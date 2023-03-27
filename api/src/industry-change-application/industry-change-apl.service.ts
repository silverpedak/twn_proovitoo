import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  IndustryChangeApplicationStatus,
  ObjectStatusIndustryChangeApp,
} from 'src/common/constants/enums';

import { Resident, ResidentDocument } from 'src/resident-register/schemas';
import {
  CreateIndustryChangeDto,
  IndustryChangeDto,
  QueryIndustryChangeApplicationDto,
} from './dtos';
import { ResidentNotFoundException } from 'src/resident-register/exceptions';
import {
  ApplicationNotFoundException,
  ApplicationsNotFoundException,
} from './exceptions';
import {
  IndustryChangeApplication,
  IndustryChangeAplDocument,
} from './schemas';
import {
  isRequestedAppMatchingCurrent,
  createNewIndustryChangeApplication,
  validateResidency,
  calculateApplicationStatus,
} from './utils';

@Injectable()
export class IndustryChangeApplicationService {
  constructor(
    @InjectModel(IndustryChangeApplication.name)
    private readonly industryChangeAplModel: mongoose.Model<IndustryChangeAplDocument>,
    @InjectModel(Resident.name)
    private readonly residentModel: mongoose.Model<ResidentDocument>,
  ) {}

  async create(
    requestedApplication: CreateIndustryChangeDto,
  ): Promise<IndustryChangeDto> {
    const {
      residentSub,
      willWorkInPhysicalJurisdiction,
      industry,
      regulatoryElection,
      regulatoryElectionSub,
    } = requestedApplication;

    const residentFound = await this.residentModel.findOne({
      sub: residentSub,
    });
    if (!residentFound) {
      throw new ResidentNotFoundException();
    }

    validateResidency(residentFound);
    isRequestedAppMatchingCurrent(residentFound, requestedApplication);
    const applicationStatus = calculateApplicationStatus(
      willWorkInPhysicalJurisdiction,
    );
    const newApplication = createNewIndustryChangeApplication(
      residentFound,
      requestedApplication,
      applicationStatus,
    );
    const createdApplication = await this.industryChangeAplModel.create(
      newApplication,
    );
    // If industry change application status is approved, then system changes resident’s industry information
    if (
      createdApplication.status === IndustryChangeApplicationStatus.APPROVED
    ) {
      const update = {
        willWorkInPhysicalJurisdiction,
        industry: industry || null,
        regulatoryElection: regulatoryElection || null,
        regulatoryElectionSub: regulatoryElectionSub || null,
      };
      await this.residentModel.findOneAndUpdate(
        { sub: residentFound.sub },
        update,
        { new: true },
      );
    }
    return createdApplication;
  }

  async findById(id: string): Promise<IndustryChangeDto> {
    const applicationFound = await this.industryChangeAplModel.findOne({
      _id: id,
    });
    if (
      !applicationFound ||
      applicationFound?.objectStatus !== ObjectStatusIndustryChangeApp.CURRENT
    ) {
      throw new ApplicationNotFoundException();
    }
    return applicationFound;
  }

  async findByQuery(
    query: QueryIndustryChangeApplicationDto,
  ): Promise<IndustryChangeDto[]> {
    const { residentSub, statuses } = query;
    const applicationsFound = await this.industryChangeAplModel.find({
      residentSub,
      status: { $in: [...statuses] },
      objectStatus: ObjectStatusIndustryChangeApp.CURRENT,
    });
    return applicationsFound;
  }

  async delete(ids: string[]): Promise<IndustryChangeDto[]> {
    let deletedApplications: IndustryChangeApplication[] = [];
    let idsNotFound: string[] = [];
    for (const id of ids) {
      const deleted = await this.industryChangeAplModel.findOneAndUpdate(
        { _id: id, status: IndustryChangeApplicationStatus.IN_REVIEW },
        { objectStatus: ObjectStatusIndustryChangeApp.DELETED },
        { new: true },
      );
      if (!deleted) {
        idsNotFound.push(id);
      } else {
        deletedApplications.push(deleted);
      }
    }
    if (idsNotFound.length !== 0) {
      throw new ApplicationsNotFoundException(idsNotFound);
    }
    return deletedApplications;
  }
}
