import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { GetTokenInfo } from 'src/dec/get-token-info.decorator';

@UseGuards(AuthGuard)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @GetTokenInfo('id') id: number,
  ) {
    return this.articleService.create(createArticleDto, +id);
  }

  @Get()
  findByAuthor(@GetTokenInfo('id') id: number) {
    return this.articleService.findByAuthor(+id);
  }
}
