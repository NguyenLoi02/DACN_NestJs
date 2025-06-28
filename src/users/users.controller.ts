import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { Public, ResponseMessage, User } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create a new user')
  create(@Body() createUserDto: CreateUserDto,@User() user: IUser) {
    const newUser =  this.usersService.create(createUserDto,user);
    return {
      _id: user._id,
      name:user.name
    }
  }

  @Get()
  @ResponseMessage('respont message')
  findAll(@Query('page') currentPage: string, @Query('limit') limit: string, @Query() qs: string) {
    return this.usersService.findAll(+currentPage, +limit,qs);
  }


  @Public()
  @Get(':id')
  @ResponseMessage('"Fetch user by id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @ResponseMessage('Update a new user')
  update(@Body() updateUserDto: UpdateUserDto,@User() user: IUser) {
    return this.usersService.update(updateUserDto,user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a user')
  remove(@Param('id') id: string,@User() user: IUser) {
    return this.usersService.remove(id,user);
  }
}
