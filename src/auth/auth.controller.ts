import { Body, Controller, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/loginDto.dto';

@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService, private UserService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  public async login(@Body() loginData: LoginDto): Promise<{ accessToken: string }> {
    
    const findUserByEmail = await this.UserService.findByEmail(loginData.email);

    if(!findUserByEmail) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.authService.login(loginData, findUserByEmail);
  }
}
