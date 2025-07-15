import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
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
export class CreateUserDto {
  @IsEmail({}, { message: ' Email không đúng định dạng' })
  @IsNotEmpty({ message: ' Email không được để trống' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: ' password không được để trống' })
  @ApiProperty()
  password: string;

  @IsNotEmpty({ message: ' name không được để trống' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: ' age không được để trống' })
  @ApiProperty()
  age: number;

  @IsNotEmpty({ message: ' gender không được để trống' })
  @ApiProperty()
  gender: string;

  @IsNotEmpty({ message: ' address không được để trống' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: ' role không được để trống' })
  @IsMongoId({message: "role có định dạng là mongo id"})
  @ApiProperty()
  role: mongoose.Schema.Types.ObjectId;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  @ApiProperty()
  company: Company;
}

export class RegisterUserDto {
  @IsEmail({}, { message: ' Email không đúng định dạng' })
  @IsNotEmpty({ message: ' Email không được để trống' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: ' password không được để trống' })
  @ApiProperty()
  password: string;

  @IsNotEmpty({ message: ' name không được để trống' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: ' age không được để trống' })
  @ApiProperty()
  age: number;

  @IsNotEmpty({ message: ' gender không được để trống' })
  @ApiProperty()
  gender: string;

  @IsNotEmpty({ message: ' address không được để trống' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: ' role không được để trống' })
  @ApiProperty()
  role: string;
}

//create-user.dto
export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin', description: 'username' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
      example: '123456',
      description: 'password',
  })
  readonly password: string;

}

