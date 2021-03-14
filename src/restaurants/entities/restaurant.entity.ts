import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

//isAvstract:true는 이걸 어디선가 복사해서 쓴다는의미
//직접쓰는게 아니라 어떤것으로 확장시킨다는 의미
@InputType('RestaurantInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity{

    @Field(is => String)
    @Column()
    @IsString()
    @Length(5)
    name : string;

    @Field(type => String)
    @Column()
    @IsString()
    coverImage: string;

    @Field(type => String, { defaultValue : '강남'})
    @Column()
    @IsString()
    address:string;

    @Field(type => Category, { nullable: true })
    @ManyToOne(
        type => Category, 
        category => category.restaurants,
        { nullable : true, onDelete:"SET NULL"}
    )   
    category: Category; 

    @Field(type => User)
    @ManyToOne(
        type => User, 
        user => user.restaurants,
        {onDelete : 'CASCADE'}
    )   
    owner: User; 
}