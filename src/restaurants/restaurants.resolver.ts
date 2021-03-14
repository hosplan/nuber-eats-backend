import { SetMetadata } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { number } from "joi";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User, UserRole } from "src/users/entities/user.entity";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./entities/restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantsResolver{
    //restaurant 서비스에 접근이 가능
    constructor(private readonly retaurantService : RestaurantService){}    

    @Mutation(returns => CreateRestaurantOutput)    
    @Role(['Owner'])
    async createRestaurant(
        @AuthUser() authUser:User,
       @Args('input') createRestaurantInput : CreateRestaurantInput,
    ) : Promise<CreateRestaurantOutput> {     
        return this.retaurantService.createRestaurant(
            authUser,
            createRestaurantInput);
    }
}

