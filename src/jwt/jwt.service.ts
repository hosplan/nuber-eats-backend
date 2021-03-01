import { Inject, Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';


@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options:JwtModuleOptions
    ) {
        console.log(options);
    }
    sign(userId:number):string{
        return jwt.sign(
            {id:userId}, this.options.privateKey);
    }

    hello(){
        console.log('hello');
    }

    verify(token:string){
        return jwt.verify(token, this.options.privateKey);
    }
}
