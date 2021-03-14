import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateRestaurantInput, CreateRestaurantOutput } from "../dtos/create-restaurant.dto";
import { Category } from "./category.entity";
import { Restaurant } from "./restaurant.entity";
export declare class RestaurantService {
    private readonly restaurants;
    private readonly categories;
    constructor(restaurants: Repository<Restaurant>, categories: Repository<Category>);
    createRestaurant(owner: User, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput>;
}
