import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {
  @IsNotEmpty({ message: ' name không được để trống' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: ' description  không được để trống' })
  @ApiProperty()
  description: string;

  @IsNotEmpty({ message: ' isActive không được để trống' })
  @ApiProperty()
  isActive: boolean;

  @IsNotEmpty({ message: ' permissions không được để trống' })
  @IsMongoId({each: true, message: "each permission là mongo object id"})
  @IsArray({message: 'permission có định dạng là array'})
  @ApiProperty()
  permissions: mongoose.Schema.Types.ObjectId[];
}
