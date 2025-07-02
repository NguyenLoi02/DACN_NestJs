import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchemas } from 'src/schemas/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true })
export class User extends BaseSchemas {
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
  gender: string;

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
  }

  @Prop()
  role: string;

  @Prop()
  refreshToken: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
