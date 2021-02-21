import { Field, InputType, PartialType,ArgsType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurant.dto";

@InputType()
export class UpdateRestarantInputType extends PartialType(CreateRestaurantDto) {}

@ArgsType()
export class UpdateRestarantDto {
    @Field(type => Number)
    id:number;

    @Field(type => UpdateRestarantInputType)
    data : UpdateRestarantInputType;
}