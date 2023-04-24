import { NextFunction, Request, Response } from 'express';
import { Vacancy } from '@prisma/client';
import { CreateVacancyDto } from '@dtos/vacancy.dto';
import VacancyService from '@/services/vacancy.service';

class VacancyController {
  public VacancyService = new VacancyService();

  public getVacancy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllVacancyData: Vacancy[] = await this.VacancyService.findAllVacancies();

      res.status(200).json({ data: findAllVacancyData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getVacancyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId = Number(req.params.id);
      const findOneVacancyData: Vacancy = await this.VacancyService.findVacancyById(vacancyId);

      res.status(200).json({ data: findOneVacancyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createVacancy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyData: CreateVacancyDto = req.body;
      const createVacancyData: Vacancy = await this.VacancyService.createVacancy(vacancyData);

      res.status(201).json({ data: createVacancyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateVacancy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId = Number(req.params.id);
      const vacancyData: CreateVacancyDto = req.body;
      const updateVacancyData: Vacancy = await this.VacancyService.updateVacancy(vacancyId, vacancyData);

      res.status(200).json({ data: updateVacancyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteVacancy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vacancyId = Number(req.params.id);
      const deleteVacancyData: Vacancy = await this.VacancyService.deleteVacancy(vacancyId);

      res.status(200).json({ data: deleteVacancyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VacancyController;
