import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchemas } from 'src/schemas/base.schema';
export type JobDocument = HydratedDocument<Job>;
@Schema({timestamps: true })
export class Job extends BaseSchemas {
  @Prop()
  name: string;

  @Prop()
  skills: string[];

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    logo: string;
  };

  @Prop()
  location: string;

  @Prop()
  salary: number;

  @Prop()
  quantity: number;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;
}
export const JobSchema = SchemaFactory.createForClass(Job);
