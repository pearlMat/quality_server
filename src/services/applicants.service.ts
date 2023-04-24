import { PrismaClient, Applicant } from '@prisma/client';
import { CreateApplicantDto } from '@/dtos/applicants.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class ApplicantService {
  public applicants = new PrismaClient().applicant;

  public async findAllApplicants(): Promise<Applicant[]> {
    const allApplicants: Applicant[] = await this.applicants.findMany();
    return allApplicants;
  }

  public async findApplicantById(applicantId: number): Promise<Applicant> {
    if (isEmpty(applicantId)) throw new HttpException(400, 'ApplicantId is empty');

    const findApplicant: Applicant = await this.applicants.findUnique({ where: { id: applicantId } });
    if (!findApplicant) throw new HttpException(409, "Applicant doesn't exist");

    return findApplicant;
  }

  public async createApplicant(applicantData: CreateApplicantDto): Promise<Applicant> {
    if (isEmpty(applicantData)) throw new HttpException(400, 'ApplicanttData is empty');

    const createApplicantData: Applicant = await this.applicants.create({ data: { ...applicantData } });
    return createApplicantData;
  }
}

export default ApplicantService;
