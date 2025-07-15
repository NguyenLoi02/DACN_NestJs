import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: ' name không được để trống' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: ' apiPath  không được để trống' })
  @ApiProperty()
  apiPath: string;

  @IsNotEmpty({ message: ' method không được để trống' })
  @ApiProperty()
  method: string;

  @IsNotEmpty({ message: ' module không được để trống' })
  @ApiProperty()
  module: string;
}
