import { CreateRestaurantDto } from "./create-restaurant.dto";
declare const UpdateRestarantInputType_base: import("@nestjs/common").Type<Partial<CreateRestaurantDto>>;
export declare class UpdateRestarantInputType extends UpdateRestarantInputType_base {
}
export declare class UpdateRestarantDto {
    id: number;
    data: UpdateRestarantInputType;
}
export {};
