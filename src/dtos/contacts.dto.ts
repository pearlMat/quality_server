import { IsEmail, IsString } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;
  @IsString()
  public enquiry_title: string;

  @IsString()
  public message: string;

  @IsString()
  public phone: string;
}
