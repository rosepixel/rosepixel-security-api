import {
    DynamicModule,
    Provider,
    Global,
    Module,
    ModuleMetadata,
    Type
} from "@nestjs/common";

import { KafkaService } from "./kafka.service";

export interface KafkaOptions {
    clientId: string;
    groupId: string;
    brokers: string[];
}

interface KafkaOptionsFactory {
    createKafkaOptions(): Promise<KafkaOptions> | KafkaOptions;
}

export interface KafkaAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[];
    useExisting?: Type<KafkaOptionsFactory>;
    useClass?: Type<KafkaOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<KafkaOptions> | KafkaOptions
}

@Global()
@Module({
    providers: [KafkaService],
    exports: [KafkaService]
})
export class KafkaModule {
    static forRootAsync(kafkaOptions: KafkaAsyncOptions): DynamicModule {
        return {
            module: KafkaModule,
            imports: kafkaOptions.imports || [],
            providers: this.createKafkaProviders(kafkaOptions),
            exports: [KafkaService]
        }
    }

    private static createKafkaProviders(
        kafkaOptions: KafkaAsyncOptions
    ): Provider[] {
        if (kafkaOptions.useExisting || kafkaOptions.useFactory) {
            return [this.createKafkaOptionsProvider(kafkaOptions)];
        }

        return [
            this.createKafkaOptionsProvider(kafkaOptions),
            {
                provide: kafkaOptions.useClass,
                useClass: kafkaOptions.useClass
            }
        ];
    }

    private static createKafkaOptionsProvider(
        options: KafkaAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: "KAFKA_OPTIONS",
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        return {
            provide: "KAFKA_OPTIONS",
            useFactory: async (optionsFactory: KafkaOptionsFactory) => await optionsFactory.createKafkaOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
}