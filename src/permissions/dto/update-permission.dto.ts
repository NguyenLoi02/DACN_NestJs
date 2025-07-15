import { CreatePermissionDto } from './create-permission.dto';
import { ApiProperty ,PartialType} from '@nestjs/swagger';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty()
  _id:string
}
