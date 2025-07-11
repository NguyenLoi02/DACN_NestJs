import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsNotEmpty({ message: ' email không được để trống' })
  @IsEmail({}, { message: 'email không hợp lệ' })
  email: string;

  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: ' url không được để trống' })
  url: string;

  status: string;

  @IsNotEmpty({ message: ' companyId không được để trống' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: ' jobId không được để trống' })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: ' url không được để trống' })
  url: string;

  @IsNotEmpty({ message: ' companyId  không được để trống' })
  @IsMongoId({ message: ' companyId  is a mongo id' })
  companyId: string;

  @IsNotEmpty({ message: ' jobId không được để trống' })
  @IsMongoId({ message: ' jobId  is a mongo id' })
  jobId: string;
}
