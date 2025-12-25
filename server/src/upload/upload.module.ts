import { Global, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads',
          filename: (
            _: Express.Request,
            file: Express.Multer.File,
            callback: (err: Error | null, filename: string) => void,
          ) => {
            const filename = new Date().getTime() + '-' + file.originalname;
            return callback(null, filename);
          },
        }),
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
