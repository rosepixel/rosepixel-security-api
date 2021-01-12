import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClaimType } from '@model/claim/claim-type.enum';
import { Claim } from '@model/claim/claim.entity';
import { ClaimService } from '@model/claim/claim.service';
import { ClaimResolver } from '@model/claim/claim.resolver';

registerEnumType(ClaimType, {
    name: "ClaimType",
    description: "Tipos suportados pelas claims.",
    valuesMap: {
        DATE: {
            description: "Define um tipo data."
        },
        STRING: {
            description: "Define um tipo texto."
        },
        INTEGER: {
            description: "Define um tipo número inteiro."
        },
        FLOAT: {
            description: "Define um tipo número fracionário."
        }
    }
});

@Module({
    imports: [
        TypeOrmModule.forFeature([Claim])
    ],
    providers: [
        ClaimService,
        ClaimResolver
    ]
})
export class ClaimModule { }
