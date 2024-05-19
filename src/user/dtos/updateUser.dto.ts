import { IsEmail, IsString } from 'class-validator';

export class UpdateUserTdo {
  @IsString()
  name: string;
  
  @IsString()
  @IsEmail()
  email: string;
}