import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { number } from "joi";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestarantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./entities/restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantsResolver{
    //restaurant 서비스에 접근이 가능
    constructor(private readonly retaurantService : RestaurantService){}    
    @Query(returns => [Restaurant])
    restaurants() : Promise<Restaurant[]> {        
        return this.retaurantService.getAll();
    }
    @Mutation(returns => Boolean)    
    async createRestaurant(
       @Args('input') createRestaurantDto : CreateRestaurantDto,
    ) : Promise<boolean> {   
        console.log(CreateRestaurantDto);   
        try{
            await this.retaurantService.createRestaurant(createRestaurantDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }
    @Mutation(returns => Boolean)
    async updateRetaurant(
       @Args() updateRetaurantDto : UpdateRestarantDto
    ) : Promise<boolean> {
        try{
            await this.retaurantService.updateRestaurant(updateRetaurantDto);
            return true;
        }catch(e) {
            console.log(e);
            return false;
        }
    }
}

