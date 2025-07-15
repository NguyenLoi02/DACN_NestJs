import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  @ApiProperty()
  name: string;

  @IsEmail({}, { message: 'email không đúng định dạng' })
  @IsNotEmpty({ message: 'email không được để trống' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'skills không được để trống' })
  @IsArray({ message: 'skills có định dạng là array' })
  @IsString({ each: true, message: 'skills có định dạng là array' })
  @ApiProperty()
  skills: string[];
}
