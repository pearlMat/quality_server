import { Router } from 'express';
import ApplicantsController from '@/controllers/applicants.controller';
import { CreateApplicantDto } from '@/dtos/applicants.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ApplicantsRoute implements Routes {
  public path = '/applicants';
  public router = Router();
  public ApplicantsController = new ApplicantsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ApplicantsController.getApplicants);
    this.router.get(`${this.path}/:id(\\d+)`, this.ApplicantsController.getApplicantById);
    this.router.post(`${this.path}`, validationMiddleware(CreateApplicantDto, 'body'), this.ApplicantsController.createApplicant);
  }
}

export default ApplicantsRoute;
