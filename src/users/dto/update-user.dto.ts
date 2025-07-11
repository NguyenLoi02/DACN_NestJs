import { CreateUserDto } from './create-user.dto';
import { ApiProperty ,OmitType} from '@nestjs/swagger';

export class UpdateUserDto extends OmitType(CreateUserDto,['password'] as const) {
  @ApiProperty()
  _id: string
}
