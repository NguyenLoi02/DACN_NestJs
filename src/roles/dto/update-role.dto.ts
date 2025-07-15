import { CreateRoleDto } from './create-role.dto';
import { PartialType,ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
