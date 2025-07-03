import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchemas } from 'src/schemas/base.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps: true })
export class Company extends BaseSchemas {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
