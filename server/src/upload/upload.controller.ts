import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Uploads } from 'src/dec/uploads.decorator';
import { fileTypeValidate } from 'src/utils/fileTypeValidate';

@Controller('upload')
export class UploadController {
  @Post()
  @Uploads('file', { fileFilter: fileTypeValidate('image') })
  upload(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
