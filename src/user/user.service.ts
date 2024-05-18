import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: Prisma.UsersCreateInput): Promise<Users> {

    const saltOrRounds = 10;
    const passwordHashed = await hash(data?.password, saltOrRounds);
    
    const userData: Prisma.UsersCreateInput = {
      ...data, 
      password: passwordHashed
    }
    
    const newUser = await this.prismaService.users.create({
      data: userData
    })

    return newUser;
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const user = await this.prismaService.users.findFirst({
      where: {
        email: email
      }
    })
    return user;
  }

  public async findById(id: string): Promise<Users | null> {
    const user = await this.prismaService.users.findFirst({
      where: { id: id },
      select: {
        id: false,
        name: true,
        email: true,
        password: false,
        created_at: false,
        updated_at: false,        
      }
    })
    return user as Users;
  }
  
}