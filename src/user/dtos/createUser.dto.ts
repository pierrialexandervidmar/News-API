import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()nest generate module auth && nest generate service auth && nest generate controller auth 
  @IsEmail()
  email: string;
  
  @IsString()
  password: string;
}