import { Router } from 'express';
import VacancyController from '@/controllers/vacancy.controller';
import { CreateVacancyDto } from '@/dtos/vacancy.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class VacancyRoute implements Routes {
  public path = '/vacancies';
  public router = Router();
  public VacancyController = new VacancyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.VacancyController.getVacancy);
    this.router.get(`${this.path}/:id(\\d+)`, this.VacancyController.getVacancyById);
    this.router.post(`${this.path}`, validationMiddleware(CreateVacancyDto, 'body'), this.VacancyController.createVacancy);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateVacancyDto, 'body', true), this.VacancyController.updateVacancy);
    this.router.delete(`${this.path}/:id(\\d+)`, this.VacancyController.deleteVacancy);
  }
}

export default VacancyRoute;
