import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

//isAvstract:true는 이걸 어디선가 복사해서 쓴다는의미
//직접쓰는게 아니라 어떤것으로 확장시킨다는 의미
@InputType('CategoryInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Category extends CoreEntity{

    @Field(is => String)
    @Column({unique : true})
    @Column()
    @IsString()
    @Length(5)
    name : string;

    @Field(type => String, {nullable:true})
    @Column({nullable:true})
    @IsString()
    coverImage: string;

    @Field(type => String)
    @Column({unique:true})
    @IsString()
    slug: string;

    @Field(type => [Restaurant])
    @OneToMany(
        type => Restaurant, 
        restaurant => restaurant.category
    )
    restaurants: Restaurant[];
} 