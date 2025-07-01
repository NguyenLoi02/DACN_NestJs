import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { compare, genSaltSync, hashSync } from 'bcrypt';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  hashPassword = async (password: string): Promise<any> => {
    const salt = await genSaltSync(10);
    const hash = await hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto, user: IUser): Promise<User> {
    const { name, email, password, age, gender, address } = createUserDto;
    const hardPassword = await this.hashPassword(password);
    const checkEmail = await this.findOneByUsername(email);
    if (checkEmail) {
      throw new BadRequestException('Email: ${email} đã tồn tại !');
    }
    const createUser = await this.userModel.create({
      name,
      email,
      password: hardPassword,
      age,
      gender,
      address,
      role: 'user',
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return createUser;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let { sort } = aqp(qs);
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    if (isEmpty(sort)) {
      // @ts-ignore: Unreachable code error
      sort = '-updatedAt';
    }

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select("-password")
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
    return this.userModel.findOne({ _id: id }).select('-password');
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ email: username });
  }
  isValidPassword(password: string, hash: string) {
    return compare(password, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    const { _id, ...updateData } = updateUserDto;
    const newUpdate = await this.userModel.updateOne(
      { _id },
      {
        ...updateData,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return newUpdate;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    await this.userModel.updateOne(
      { _id: id },
      { deletedBy: { _id: user._id, email: user.email } },
    );
    return this.userModel.softDelete({ _id: id });
  }

  async register(user: RegisterUserDto) {
    const { name, email, password, age, gender, address } = user;
    const checkEmail = await this.findOneByUsername(email);
    if (checkEmail) {
      throw new BadRequestException('Email: ${email} đã tồn tại !');
    }
    const hashPassword = await this.hashPassword(password);
    let newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: 'user',
    });
    return newRegister;
  }

  updateUserToken = async (refreshToken:string, _id: string)=>{
    return await this,this.userModel.updateOne(
      {_id},
      {refreshToken}
    )
  }
  findUserToken = async (refreshToken:string)=>{
    return await this,this.userModel.findOne(
      {refreshToken}
    )
  }

}
