import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { GetTokenInfo } from 'src/dec/get-token-info.decorator';
import { UpdateArticleDto } from './dto/update-article.dto';

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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.articleService.delete(+id);
  }
}
