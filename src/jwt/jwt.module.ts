import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({
})
@Global()
export class JwtModule {
    static forRoot(options:JwtModuleOptions) : DynamicModule {
        return {
            module : JwtModule,
            exports: [JwtService],
            providers:[
                {
                    provide : CONFIG_OPTIONS,
                    useValue: options,
                },
                JwtService]
            //위에것을 풀어쓰면 이렇게 된다.
            //providers: [{
            //    provide:JwtService,
            //    useClass:JwtService
            //}],
        };
    }
}
