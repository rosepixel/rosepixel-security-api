import { InputType } from "@nestjs/graphql";

import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateUserInput {
    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório." })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: "O e-mail é obrigatório." })
    email: string;

    @IsString()
    @IsNotEmpty({ message: "A senha é obrigatória." })
    password: string;
}