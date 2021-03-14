import { User } from "src/users/entities/user.entity";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { RestaurantService } from "./entities/restaurants.service";
export declare class RestaurantsResolver {
    private readonly retaurantService;
    constructor(retaurantService: RestaurantService);
    createRestaurant(authUser: User, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput>;
}
