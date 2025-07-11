import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
class Company {
    @IsNotEmpty()
    @ApiProperty()
    _id: mongoose.Schema.Types.ObjectId;
  
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  }

export class CreateJobDto {
  @IsNotEmpty({ message: ' name không được để trống' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: ' skills không được để trống' })
  @ApiProperty()
  skills: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  @ApiProperty()
  company: Company;

  @IsNotEmpty({ message: ' location không được để trống' })
  @ApiProperty()
  location: string;

  @IsNotEmpty({ message: ' salary không được để trống' })
  @ApiProperty()
  salary: number;

  @IsNotEmpty({ message: ' quantity không được để trống' })
  @ApiProperty()
  quantity: number;

  @IsNotEmpty({ message: ' level không được để trống' })
  @ApiProperty()
  level: string;

  @IsNotEmpty({ message: ' description không được để trống' })
  @ApiProperty()
  description: string;

  @Transform(({value})=> new Date(value))
  @IsDate({ message: ' startDate không đúng định dạng' })
  @IsNotEmpty({ message: ' role không được để trống' })
  @ApiProperty()
  startDate: string;

  @Transform(({value})=> new Date(value))
  @IsDate({ message: ' endDate không đúng định dạng' })
  @IsNotEmpty({ message: ' role không được để trống' })
  @ApiProperty()
  endDate: string;

  @IsNotEmpty()
  @ApiProperty()
  isActive: string;

}
