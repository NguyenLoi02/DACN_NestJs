import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IUser } from 'src/users/users.interface';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { ApiBody } from '@nestjs/swagger';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage('respont message')
  findAll(@Query('current') current: string, @Query('pageSize') pageSize: string, @Query() qs: string) {
    return this.companiesService.findAll(+current, +pageSize,qs);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch()
  @ApiBody({ type: UpdateCompanyDto })
  update(@Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return this.companiesService.update(updateCompanyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
