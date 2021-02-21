import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//isAvstract:true는 이걸 어디선가 복사해서 쓴다는의미
//직접쓰는게 아니라 어떤것으로 확장시킨다는 의미
@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id:number;

    @Field(is => String)
    @Column()
    @IsString()
    @Length(5)
    name : string;

    @Field(type => Boolean, {nullable:true, defaultValue:true})
    @Column({default:true})
    @IsOptional()
    @IsBoolean()   
    isVegan: boolean;

    @Field(type => String, { defaultValue : 'adadadadad'})
    @Column()
    @IsString()
    address:string;
}