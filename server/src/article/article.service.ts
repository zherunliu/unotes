import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createArticleDto: CreateArticleDto, authorId: number) {
    try {
      const data = {
        ...createArticleDto,
        authorId,
      };
      await this.prismaService.article.create({
        data,
      });
      return {
        code: 200,
        message: 'Created successfully.',
      };
    } catch (err) {
      console.log('Article creation failed.', err);
      throw new HttpException('Article creation failed.', 400);
    }
  }

  async findByAuthor(id: number) {
    try {
      const res = await this.prismaService.article.findMany({
        where: { authorId: id },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      });
      return res;
    } catch (err) {
      console.log('Data load failed.', err);
      throw new HttpException('Data load failed.', 500);
    }
  }
}
