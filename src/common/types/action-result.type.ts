import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ActionResultType {
    @Field()
    error?: boolean;

    @Field()
    message?: string;
}