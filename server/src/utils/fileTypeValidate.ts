import { HttpException } from '@nestjs/common';

export const fileTypeValidate = (...fileType: string[]) => {
  return (
    _: Express.Request,
    file: Express.Multer.File,
    cb: (err: Error | null, success: boolean) => void,
  ) => {
    if (fileType.some((item) => file.mimetype.includes(item))) {
      cb(null, true);
    } else {
      cb(new HttpException('Unsupported file type', 400), false);
    }
  };
};
