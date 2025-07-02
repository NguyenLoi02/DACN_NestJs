import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
import mongoose, { HydratedDocument} from "mongoose";

export type BaseDocument = HydratedDocument<BaseSchemas>;

@Schema({timestamps: true })
export class BaseSchemas {
  
  @Prop({type: Object})
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string
  }
  
  @Prop({type: Object})
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string
  }

  @Prop({type: Object})
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string
  }

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const BaseSchema = SchemaFactory.createForClass(BaseSchemas);
