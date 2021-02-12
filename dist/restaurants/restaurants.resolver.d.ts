import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
export declare class RestaurantsResolver {
    restaurants(veganOnly: boolean): Restaurant[];
    createRestaurant(createRestaurantDto: CreateRestaurantDto): boolean;
}