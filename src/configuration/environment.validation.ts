import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision",
}

class EnvironmentVariables {
    @IsEnum(Environment, { message: "O ambiente é obrigatório" })
    NODE_ENV: Environment;

    @IsString({ message: "O nome do domínio, IP ou endereço de loopback é obrigatório" })
    SERVER_HOST: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 4
    }, { message: "O número da porta é obrigatório" })
    SERVER_PORT: number;

    @IsString({ message: "A chave privada do JWT é obrigatória" })
    JWT_SECRET: string;

    @IsString({ message: "O nome do domínio, IP ou endereço de loopback é obrigatório" })
    REDIS_HOST: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 4
    }, { message: "O número da porta é obrigatório" })
    REDIS_PORT: number;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 4
    }, { message: "O número da base de dados é obrigatório" })
    REDIS_DB_NUMBER: number;

    @IsString({ message: "A senha é obrigatória" })
    REDIS_PASSWORD: string;

    @IsString({ message: "O nome do domínio, IP ou endereço de loopback é obrigatório" })
    DATABASE_HOST: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 4
    }, { message: "O número da porta é obrigatório" })
    DATABASE_PORT: number;

    @IsString({ message: "O nome do usuário da aplicação da base de dados é obrigatório" })
    DATABASE_USERNAME: string;

    @IsString({ message: "A senha do usuário da aplicação da base de dados é obrigatória" })
    DATABASE_PASSWORD: string;

    @IsString({ message: "O nome da base de dados da aplicação é obrigatória" })
    DATABASE_DATABASE: string;

    @IsBoolean({ message: "A sincronização é obrigatória, use \"false\" para produção" })
    DATABASE_SYNCHRONIZE: boolean;
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