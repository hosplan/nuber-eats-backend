import { Repository } from "typeorm";
import { CreateRestaurantDto } from "../dtos/create-restaurant.dto";
import { UpdateRestarantDto } from "../dtos/update-restaurant.dto";
import { Restaurant } from "./restaurant.entity";
export declare class RestaurantService {
    private readonly restaurants;
    constructor(restaurants: Repository<Restaurant>);
    getAll(): Promise<Restaurant[]>;
    createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    updateRestaurant({ id, data }: UpdateRestarantDto): Promise<import("typeorm").UpdateResult>;
}
