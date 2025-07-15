import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Permission } from "src/permissions/schemas/permission.schema";
import { BaseSchemas } from "src/schemas/base.schema";

export type RoleDocument = HydratedDocument<Role>;
@Schema({timestamps: true })
export class Role extends BaseSchemas{
    @Prop()
    name: string;
  
    @Prop()
    description : string;
  
    @Prop()
    isActive: boolean;
  
    @Prop({type: [mongoose.Schema.Types.ObjectId],ref: Permission.name})
    permissions: Permission[];
 
}
export const RoleSchema = SchemaFactory.createForClass(Role);