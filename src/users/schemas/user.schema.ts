import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true })
export class User {
  @IsEmail()
  @Prop()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsNotEmpty()
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: string;

  @Prop()
  address: string;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
