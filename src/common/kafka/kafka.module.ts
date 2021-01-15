import { DynamicModule, Global, Module, Logger } from "@nestjs/common";

import { KafkaService } from "./kafka.service";
import { KafkaConfig } from "./kafka.message";

@Global()
@Module({})
export class KafkaModule {
    static forRootAsync(kafkaConfig: KafkaConfig): DynamicModule {
        return {
            global: true,
            module: KafkaModule,
            providers: [{
                provide: KafkaService,
                useValue: new KafkaService(new Logger(), kafkaConfig)
            }],
            exports: [KafkaService]
        }
    }
}