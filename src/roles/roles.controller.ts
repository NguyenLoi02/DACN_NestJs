import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User, Public, ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() CreateRoleDto: CreateRoleDto, @User() user: IUser) {
    return this.rolesService.create(CreateRoleDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage('respont message')
  findAll(@Query('current') current: string, @Query('pageSize') pageSize: string, @Query() qs: string) {
    return this.rolesService.findAll(+current, +pageSize,qs);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch()
  update(@Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.rolesService.update(updateRoleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.rolesService.remove(id, user);
  }
}
