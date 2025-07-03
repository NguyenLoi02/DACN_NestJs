import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { Role, RoleDocument } from './schemas/role.schema';
import { isEmpty } from 'class-validator';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private RolemModel: SoftDeleteModel<RoleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name } = createRoleDto;
    const isExist = await this.RolemModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException('Role với name="${name}" đã tồn tại');
    }
    return await this.RolemModel.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let { sort } = aqp(qs);
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.RolemModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (isEmpty(sort)) {
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.RolemModel.find(filter)
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

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('not found role');
    }
    return await this.RolemModel.findById({ _id: id }).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, name: 1, method: 1 },
    });
  }

  async update(updateRoleDto: UpdateRoleDto, user: IUser) {
    const { name } = updateRoleDto;
    const isExist = await this.RolemModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException('Role với name="${name}" đã tồn tại');
    }
    const { _id, ...updateData } = updateRoleDto;
    return await this.RolemModel.updateOne(
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
    await this.RolemModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.RolemModel.softDelete({ _id: id });
  }
}
