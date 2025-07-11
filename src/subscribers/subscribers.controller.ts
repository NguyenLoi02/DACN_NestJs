import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { User, Public, ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiBody } from '@nestjs/swagger';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  create(@Body() CreateSubscriberDto: CreateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.create(CreateSubscriberDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage('respont message')
  findAll(@Query('current') current: string, @Query('pageSize') pageSize: string, @Query() qs: string) {
    return this.subscribersService.findAll(+current, +pageSize,qs);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @ApiBody({ type: UpdateSubscriberDto })
  update(@Body() updateSubscriberDto: UpdateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
