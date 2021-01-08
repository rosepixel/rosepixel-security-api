import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

import { ClaimType } from './claim-type.enum';

import { ClaimService } from './claim.service';
import { ClaimResolver } from './claim.resolver';

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
    providers: [ClaimService, ClaimResolver]
})
export class ClaimModule { }
