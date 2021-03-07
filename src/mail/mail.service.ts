import { Inject, Injectable } from '@nestjs/common';
import got from 'got/dist/source';
import * as FormData from "form-data";
import * as jwt from "jsonwebtoken";
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';


@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options:MailModuleOptions
    ) {
       
    }

    async sendEmail(subject:string, content:string, to:string, template:string, emailVars:EmailVar[]) : Promise<boolean> {
       //console.log(content);
       //console.log(FormData);
       const form = new FormData();
       form.append("from", `TaeHo from NuberEats <mailgun@${this.options.domain}>`);
       form.append("to", to);
       form.append("subject",subject);
       form.append("template", template);
       emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));
    try{
        await got.post(`https://api.mailgun.net/v3/${this.options.domain}/messages`,{
            //method:"POST",    
            headers:{
               "Authorization":`Basic ${Buffer.from(
                   `api:${this.options.apiKey}`
                ).toString("base64")}`,
            },           
            body:form,
       });  
       return true;
    }catch(error){
       return false;
    }
       //form.append("to", 'Excited User <mailgun@${this.options.domain}>')
       //const response = 
      
   }

   sendVerificationEmail(email:string, code:string) {
        this.sendEmail('Verify Your Email','verify-email','thkim@n-link.co.kr','test02', [
            {key:'code', value:code},
            {key:'username', value:email}
        ]);
   }
}
