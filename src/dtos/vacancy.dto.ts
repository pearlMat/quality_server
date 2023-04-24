import { IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsString()
  public title: string;
  @IsString()
  public job_ref: string;

  @IsString()
  public location: string;
  @IsString()
  public pay_rate: string;
  @IsString()
  public work_patterns: string;

  @IsString()
  public description: string;

  @IsString()
  public phone: string;
  @IsString()
  public driver_required: string;

  @IsString()
  public essential_experience: string;

  @IsString()
  public desirable_experience: string;
}
