import { Field, ObjectType } from "@nestjs/graphql";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ClaimType } from "./claim-type.enum";

@ObjectType()
@Entity()
export class Claim {
    @PrimaryGeneratedColumn("uuid", {
        name: "claim_id"
    })
    claim_id: string;

    @Field(() => ClaimType)
    @Column()
    type: string;

    @Column()
    key: string;

    @Column()
    value: string;
}