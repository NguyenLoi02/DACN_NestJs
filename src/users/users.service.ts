import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from './schemas/user.schema';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword = async (password: string): Promise<any> => {
    const salt = await genSaltSync(10);
    const hash = await hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password =await this.hashPassword(createUserDto.password);
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userModel.findOne({_id:id})
  }
  
async update(updateUserDto: UpdateUserDto) {
  const { _id, ...updateData } = updateUserDto;
  console.log('Đang cập nhật user với _id:', _id);
  console.log('Dữ liệu cập nhật:', {...updateData});

  return await this.userModel.updateOne({ _id }, updateData);
}


  remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return 'not found user'
    }
    return this.userModel.deleteOne({_id:id})
  }
}
 