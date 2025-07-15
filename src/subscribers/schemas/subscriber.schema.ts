import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
import { BaseSchemas } from "src/schemas/base.schema";
export type SubscriberDocument = HydratedDocument<Subscriber>;
@Schema({timestamps: true})
export class Subscriber extends BaseSchemas {
    @Prop({required: true})
    email: string

    @Prop()
    name: string

    @Prop()
    skills: string[]
}
export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);