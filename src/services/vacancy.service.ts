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

  public async updateVacancy(vacancyId: number, vacancyData: CreateVacancyDto): Promise<Vacancy> {
    if (isEmpty(vacancyData)) throw new HttpException(400, 'vacancyData is empty');

    const findVacancy: Vacancy = await this.vacancies.findUnique({ where: { id: vacancyId } });
    if (!findVacancy) throw new HttpException(409, "User doesn't exist");

    const updateVacancyData = await this.vacancies.update({ where: { id: vacancyId }, data: { ...vacancyData } });
    return updateVacancyData;
  }

  public async deleteVacancy(vacancyId: number): Promise<Vacancy> {
    if (isEmpty(vacancyId)) throw new HttpException(400, "Vacancy doesn't exist");

    const findVacancy: Vacancy = await this.vacancies.findUnique({ where: { id: vacancyId } });
    if (!findVacancy) throw new HttpException(409, "Vacancy doesn't exist");

    const deleteVacancyData = await this.vacancies.delete({ where: { id: vacancyId } });
    return deleteVacancyData;
  }
}

export default VacancyService;
