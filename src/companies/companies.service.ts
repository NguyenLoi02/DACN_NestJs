import { Injectable } from '@nestjs/common';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companymModel: SoftDeleteModel<CompanyDocument>,
  ) {}
  create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return this.companymModel.create({
      ...createCompanyDto,
      createBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, projection, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    let { sort } = aqp(qs);
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.companymModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (isEmpty(sort)) {
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.companymModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  findOne(id: string) {
    return this.companymModel.findOne({ _id: id });
  }

  update(updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const { _id, ...updateData } = updateCompanyDto;
    return this.companymModel.updateOne(
      { _id },
      {
        ...updateData,
        updateBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    await this.companymModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.companymModel.softDelete({ _id: id });
  }
}
