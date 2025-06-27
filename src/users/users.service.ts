import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { compare, genSaltSync, hashSync } from 'bcrypt';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';

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
    console.log(user);
    return createUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id });
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

  remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    const userUpdate = this.userModel.findOne({ _id: id });
    this.userModel.updateOne(
      { _id: id },
      { ...userUpdate, deletedBy: { _id: user._id, email: user.email } },
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
}
