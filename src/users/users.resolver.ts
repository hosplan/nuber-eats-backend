import { UseGuards } from "@nestjs/common";
import { Args, ArgsType, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login-dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { Role } from "src/auth/role.decorator";

@Resolver(of => User)
export class UsersResolver{
    constructor(
        private readonly usersService : UsersService
    ) {}

    @Mutation(returns => CreateAccountOutput)
    async createAccount(
        @Args("input") createAccountInput:CreateAccountInput,
        ): Promise<CreateAccountOutput>{    
            return this.usersService.createAccount(createAccountInput);                   
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput:LoginInput):Promise<LoginOutput> {
        return this.usersService.login(loginInput); 
    }
    
    @Query(returns => User)
    @Role(['Any'])
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser:User){
        return authUser;
    }

    @Role(['Any'])
    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args() userProfileInput:UserProfileInput,): Promise<UserProfileOutput> {
        return this.usersService.findById(userProfileInput.userId);
    }

   
    @Mutation(returns => EditProfileOutput)
    @Role(['Any'])
    //@AuthUser은 현재 로그인한 사용자의 정보를 준다.
    async editProfile(@AuthUser() authUser:User, @Args('input') editProfileInput: EditProfileInput)
    : Promise<EditProfileOutput>
    {
        try{
            await this.usersService.editProfile(authUser.id, editProfileInput);
            return{
                ok:true,
            }
        }
        catch(error)
        {
            return {
                ok:false,
                error
            }
        }
    }

    @Mutation(returns => VerifyEmailOutput)
    async verifyEmail(@Args('input'){ code }: VerifyEmailInput,
    ):Promise<VerifyEmailOutput>{
        //this.usersService.verifyEmail(verifyEmailInput.code);
        try
        {
            await this.usersService.verifyEmail(code);
            return {
                ok:true,
            };
        }
        catch(error)
        {
            return{
                ok:false,
                error
            }
        }
    }
}