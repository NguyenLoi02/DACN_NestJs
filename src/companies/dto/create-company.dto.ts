import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'address không được để trống' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  @ApiProperty()
  description: string;

  @IsNotEmpty({ message: 'logo không được để trống' })
  @ApiProperty()
  logo: string;
}
