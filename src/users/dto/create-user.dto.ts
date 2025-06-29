import { Type } from 'class-transformer';
import {
  IsEmail,
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
export class CreateUserDto {
  @IsEmail({}, { message: ' Email không đúng định dạng' })
  @IsNotEmpty({ message: ' Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: ' password không được để trống' })
  password: string;

  @IsNotEmpty({ message: ' name không được để trống' })
  name: string;

  @IsNotEmpty({ message: ' age không được để trống' })
  age: number;

  @IsNotEmpty({ message: ' gender không được để trống' })
  gender: string;

  @IsNotEmpty({ message: ' address không được để trống' })
  address: string;

  @IsNotEmpty({ message: ' role không được để trống' })
  role: string;
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsEmail({}, { message: ' Email không đúng định dạng' })
  @IsNotEmpty({ message: ' Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: ' password không được để trống' })
  password: string;

  @IsNotEmpty({ message: ' name không được để trống' })
  name: string;

  @IsNotEmpty({ message: ' age không được để trống' })
  age: number;

  @IsNotEmpty({ message: ' gender không được để trống' })
  gender: string;

  @IsNotEmpty({ message: ' address không được để trống' })
  address: string;

  @IsNotEmpty({ message: ' role không được để trống' })
  role: string;
}
