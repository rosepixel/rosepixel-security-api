import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseType {
    @Field()
    error: boolean;

    @Field()
    message: string;
}