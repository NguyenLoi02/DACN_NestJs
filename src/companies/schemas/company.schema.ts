import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps: true })
export class Company {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({type: Object})
  createBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string
  }
  
  @Prop({type: Object})
  updateBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string
  }

  @Prop({type: Object})
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string
  }

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
