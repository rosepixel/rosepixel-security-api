import { InputType } from "@nestjs/graphql";

import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class UpdateUserInput {
    @IsString()
    @IsOptional()
    @IsUUID()
    userId?: string;

    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório." })
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsNotEmpty({ message: "O e-mail é obrigatório." })
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty({ message: "A senha é obrigatória." })
    @IsOptional()
    password?: string;
}