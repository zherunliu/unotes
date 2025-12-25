import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'title can not be null' })
  title: string;
  @IsNotEmpty({ message: 'content can not be null' })
  content: string;
  img?: string;
}
