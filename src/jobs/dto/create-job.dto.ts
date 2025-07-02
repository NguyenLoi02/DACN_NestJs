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
    _id: mongoose.Schema.Types.ObjectId;
  
    @IsNotEmpty()
    name: string;
  }

export class CreateJobDto {
  @IsNotEmpty({ message: ' name không được để trống' })
  name: string;

  @IsNotEmpty({ message: ' skills không được để trống' })
  skills: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: ' location không được để trống' })
  location: string;

  @IsNotEmpty({ message: ' salary không được để trống' })
  salary: number;

  @IsNotEmpty({ message: ' quantity không được để trống' })
  quantity: number;

  @IsNotEmpty({ message: ' level không được để trống' })
  level: string;

  @IsNotEmpty({ message: ' description không được để trống' })
  description: string;

  @Transform(({value})=> new Date(value))
  @IsDate({ message: ' startDate không đúng định dạng' })
  @IsNotEmpty({ message: ' role không được để trống' })
  startDate: string;

  @Transform(({value})=> new Date(value))
  @IsDate({ message: ' endDate không đúng định dạng' })
  @IsNotEmpty({ message: ' role không được để trống' })
  endDate: string;

  @IsNotEmpty()
  isActive: string;

}
