import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision",
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    SERVER_PORT: number;
}

export function validate(configuration: Record<string, unknown>) {
    const validated = plainToClass(
        EnvironmentVariables,
        configuration,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validated, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validated;
}