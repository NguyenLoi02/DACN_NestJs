import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BaseSchemas } from "src/schemas/base.schema";

export type PermissionDocument = HydratedDocument<Permission>;
@Schema({timestamps: true })
export class Permission extends BaseSchemas{
    @Prop()
    name: string;
  
    @Prop()
    apiPath : string;
  
    @Prop()
    method: string;
  
    @Prop()
    module: string;
 
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
