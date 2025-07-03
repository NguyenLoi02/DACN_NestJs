import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { User, Public, ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() CreatePermissionDto: CreatePermissionDto, @User() user: IUser) {
    return this.permissionsService.create(CreatePermissionDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage('respont message')
  findAll(@Query('current') current: string, @Query('pageSize') pageSize: string, @Query() qs: string) {
    return this.permissionsService.findAll(+current, +pageSize,qs);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch()
  update(@Body() updatePermissionDto: UpdatePermissionDto, @User() user: IUser) {
    return this.permissionsService.update(updatePermissionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  }
}
