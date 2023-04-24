import { NextFunction, Request, Response } from 'express';
import { Applicant } from '@prisma/client';
import { CreateApplicantDto } from '@dtos/applicants.dto';
import ApplicantService from '@/services/applicants.service';

class ApplicantsController {
  public ApplicantService = new ApplicantService();

  public getApplicants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllApplicantsData: Applicant[] = await this.ApplicantService.findAllApplicants();

      res.status(200).json({ data: findAllApplicantsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getApplicantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ApplicantId = Number(req.params.id);
      const findOneApplicantData: Applicant = await this.ApplicantService.findApplicantById(ApplicantId);

      res.status(200).json({ data: findOneApplicantData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createApplicant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ApplicantData: CreateApplicantDto = req.body;
      const createApplicantData: Applicant = await this.ApplicantService.createApplicant(ApplicantData);

      res.status(201).json({ data: createApplicantData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApplicantsController;
