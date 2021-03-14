import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { createFalse } from "typescript";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

export enum UserRole{
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery",
}

registerEnumType(UserRole,{name:'UserRole'})

@InputType('UserInputType',{ isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity{
    @Column()
    @Field(type => String)
    @IsEmail()
    email:string;

    @Column({select:false})
    @Field(type => String)
    @IsString()
    password:string;

    @Column({ type:'enum', enum:UserRole})
    @Field(type => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Column({ default : false})
    @Field(type => Boolean)
    @IsBoolean()
    verified : boolean;

    
    @Field(type => [Restaurant])
    @OneToMany(
        type => Restaurant, 
        restaurant => restaurant.owner
    )
    restaurants: Restaurant[];


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        //만약 save()로 전달된 object에 password가 있으면
        //그때 password를 hash 한다.
        if(this.password){
            try{
                this.password = await bcrypt.hash(this.password, 10);
            }catch(e){
                console.log(e);
                throw new InternalServerErrorException();
            }    
        }      
    }

    async checkPassword(aPassword:string) : Promise<boolean>{
        try{
            console.log("DB에 저장된 이메일 "+this.email);
            console.log("DB에 저장된 비밀번호 "+this.password);
            console.log("내가 입력한 비밀번호 "+ aPassword);
           const ok = await bcrypt.compare(aPassword, this.password);
           return ok;
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}