import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "node:console";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateRestaurantInput, CreateRestaurantOutput } from "../dtos/create-restaurant.dto";
import { Category } from "./category.entity";
import { Restaurant } from "./restaurant.entity";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant) 
        private readonly restaurants: Repository<Restaurant>,
        @InjectRepository(Category)
        private readonly categories : Repository<Category>, 
    ) {
        
    }

    async createRestaurant(
        owner:User,
        createRestaurantInput : CreateRestaurantInput,
        ):Promise<CreateRestaurantOutput> {
            try{
                const newRestaurant = this.restaurants.create(createRestaurantInput);
                //await this.restaurants.save(newRestaurant);
                newRestaurant.owner = owner;
                const categoryName = createRestaurantInput.categoryName.trim().toLowerCase();
                const categorySlug = categoryName.replace(/ /g, "-");
                let category = await this.categories.findOne({slug:categorySlug});

                if(!category){
                   category = await this.categories.save(
                       this.categories.create({ slug:categorySlug, name:categoryName }),
                    );
                } 
                await this.restaurants.save(newRestaurant);
                return {
                    ok:true,
                };
            }catch(error) {
                return{
                    ok:false,
                    error : 'Could not create restaurant',
                }
            }
        
           
    }


}