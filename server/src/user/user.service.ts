import { Injectable, HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    try {
      const res = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
      return res;
    } catch (err) {
      console.log('Data load failed.', err);
      throw new HttpException('Data load failed.', 500);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      const res = await this.prismaService.user.update({
        where: {
          id,
        },
        data,
      });
      return res;
    } catch (err) {
      console.log('Data update failed.', err);
      throw new HttpException('Data update failed.', 500);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return res;
    } catch (err) {
      console.log('Data delete failed.', err);
      throw new HttpException('Data delete failed.', 500);
    }
  }
}
