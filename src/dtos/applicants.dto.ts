import { IsEmail, IsString } from 'class-validator';

export class CreateApplicantDto {
  @IsEmail()
  public email: string;

  @IsString()
  public first_name: string;
  @IsString()
  public last_name: string;
  @IsString()
  public title: string;

  @IsString()
  public experience: string;

  @IsString()
  public phone: string;
  @IsString()
  public location: string;
}
