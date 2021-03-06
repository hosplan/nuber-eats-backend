import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login-dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { MailService } from "src/mail/mail.service";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailOutput } from "./dtos/verify-email.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly users:Repository<User>,
        @InjectRepository(Verification) 
        private readonly verifications:Repository<Verification>,
        //private readonly config: ConfigService,
        private readonly jwtService : JwtService,
        private readonly mailService : MailService,
    ){
       
    }

    async createAccount({email, password, role}:CreateAccountInput): Promise<{ok:boolean, error?:string}>{
        try{
            const exists = await this.users.findOne({ email });
            console.log(exists);
            if(exists){               
                return {ok:false,error:'There is a user with that email already'};
            }
            //create()는 그냥 entity를 생성하기만 한다.
            const user = await this.users.save(
                this.users.create(
                    {
                        email, 
                        password, 
                        role
                    })
                );

                const verification = await this.verifications.save(this.verifications.create({               
                    user,
                    }),
                );
            this.mailService.sendVerificationEmail(user.email, verification.code);

            return {ok:true};
        }catch(e) {
            //make error
            return {ok:false,error:"Couldn't create account"};
        }
        // check new user
        // create user & hash the password
        
    }

    async login({email, password}:LoginInput) : Promise<{ok:boolean; error?:string, token?:string}>{
        //find the user with the eamil
        //check if the apssword is correct
        //make a JWT and give it to the user
        try
        {
            const user = await this.users.findOne(
                { email },
                {select:['password','email','id']},
            );
            if(!user){
                return{
                    ok:false,
                    error: "User Not Found",
                };
            }

            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect){
                return{
                    ok:false,
                    error:"Wrong password",
                };
            }
            console.log(user);
            const token = this.jwtService.sign(user.id);
                    
            return {
                ok:true, 
                token,
            };

        }
        catch(error) {
            return {
                ok:false,
                error,
            }
        }
    }

    async findById(id:number):Promise<UserProfileOutput>{
        try{
            const user = await this.users.findOneOrFail({id});
            return{
                ok:true,
                user:user,
            };
        } catch(error) {
            return { ok : false, error :'User Not Found'};
        }
    }

    async editProfile(userId:number, {email, password}: EditProfileInput)
    :Promise<EditProfileOutput>{
        try{
            const user = await this.users.findOne(userId);
            if(email){
                user.email = email;
                user.verified = false;
                const verification = await this.verifications.save(this.verifications.create({user}));
                this.mailService.sendVerificationEmail(user.email, verification.code);
                
            }
            
            if(password) {
                user.password = password
            }
    
            await this.users.save(user);
            return{
                ok:true,
            };
        }catch(error)
        {
            return{ok:false, error:'fuck...'};
        }
       
        //return this.users.save(user);
       //return this.users.update(userId, ...editProfileInput);
    }

    async verifyEmail(code:string): Promise<VerifyEmailOutput> {
        try{
            const verification = await this.verifications.findOne(
                {code},
                {relations:['user']}
            );
    
            if(verification){
                verification.user.verified = true;               
                await this.users.save(verification.user);
                await this.verifications.delete(verification.id);
                return {ok:true};
            }
            return {ok :false, error:'Verification not Found.'};
        }
        catch(error){
            return {ok:false, error:"Could not verify email"};
        }
       
    }
}