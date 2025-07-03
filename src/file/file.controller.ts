import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';
import path from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Public()
  @Post('upload')
  @ResponseMessage('Upload single file')
  @UseInterceptors(FileInterceptor('fileUpload'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const maxSize = 5 * 1024 * 1024; // 357 KB
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt', '.doc', '.docx'];

    const fileMime = file.mimetype;
    const fileExt = path.extname(file.originalname).toLowerCase();

    // Kiểm tra kích thước
    if (file.size > maxSize) {
      throw new BadRequestException(`File too large. Max allowed: ${maxSize / 1024}KB`);
    }

    // Kiểm tra MIME type hoặc extension phải hợp lệ
    const isMimeValid = allowedMimeTypes.includes(fileMime);
    const isExtValid = allowedExtensions.includes(fileExt);

    if (!isMimeValid && !isExtValid) {
      throw new BadRequestException(
        `Invalid file type or extension. Received mimetype: ${fileMime}, extension: ${fileExt}`,
      );
    }

    // ✅ Thành công
    // console.log('Received file:', {
    //   originalName: file.originalname,
    //   mimetype: fileMime,
    //   extension: fileExt,
    //   sizeKB: (file.size / 1024).toFixed(2),
    // });

    return {
      filename: file.filename,
    };
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
