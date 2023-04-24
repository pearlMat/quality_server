import { PrismaClient, Vacancy } from '@prisma/client';
import { CreateVacancyDto } from '@/dtos/vacancy.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class VacancyService {
  public vacancies = new PrismaClient().vacancy;

  public async findAllVacancies(): Promise<Vacancy[]> {
    const allVacancies: Vacancy[] = await this.vacancies.findMany();
    return allVacancies;
  }

  public async findVacancyById(vacancyId: number): Promise<Vacancy> {
    if (isEmpty(vacancyId)) throw new HttpException(400, 'VacancyId is empty');

    const findVacancy: Vacancy = await this.vacancies.findUnique({ where: { id: vacancyId } });
    if (!findVacancy) throw new HttpException(409, "Vacancy doesn't exist");

    return findVacancy;
  }

  public async createVacancy(vacancyData: CreateVacancyDto): Promise<Vacancy> {
    if (isEmpty(vacancyData)) throw new HttpException(400, 'VacancyData is empty');

    const createVacancyData: Vacancy = await this.vacancies.create({ data: { ...vacancyData } });
    return createVacancyData;
  }
}

export default VacancyService;
