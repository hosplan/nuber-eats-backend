import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import { MailService } from './mail.service';

@Module({})
@Global()
export class MailModule {
    static forRoot(options:MailModuleOptions) : DynamicModule {
        return {
            module : MailModule,
            providers:[
                {
                    provide : CONFIG_OPTIONS,
                    useValue: options,
                },
                MailService
            ],
            exports:[MailService],
            //위에것을 풀어쓰면 이렇게 된다.
            //providers: [{
            //    provide:JwtService,
            //    useClass:JwtService
            //}],
        };
    }
}
