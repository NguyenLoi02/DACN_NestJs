import { CreateSubscriberDto } from './create-subscriber.dto';
import {PartialType, ApiProperty } from '@nestjs/swagger';

export class UpdateSubscriberDto extends PartialType(CreateSubscriberDto) {
  @ApiProperty()
  _id: string;
}
