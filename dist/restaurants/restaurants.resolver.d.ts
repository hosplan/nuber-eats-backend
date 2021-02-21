import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestarantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./entities/restaurants.service";
export declare class RestaurantsResolver {
    private readonly retaurantService;
    constructor(retaurantService: RestaurantService);
    restaurants(): Promise<Restaurant[]>;
    createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<boolean>;
    updateRetaurant(updateRetaurantDto: UpdateRestarantDto): Promise<boolean>;
}
