import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { environment } from "@environments/environment";

import { Agent } from "@infrastructure/models/agent.model";
import { Claim } from "@infrastructure/models/claim.model";
import { Credential } from "@infrastructure/models/credential.model";
import { Group } from "@infrastructure/models/group.model";
import { Policy } from "@infrastructure/models/policy.model";
import { Role } from "@infrastructure/models/role.model";
import { Secret } from "@infrastructure/models/secret.model";
import { User } from "@infrastructure/models/user.model";
import { PolicyGroup } from "@infrastructure/models/policy-group.model";
import { UserPolicy } from "@infrastructure/models/user-policy.model";
import { GroupClaim } from "@infrastructure/models/group-claim.model";
import { GroupRole } from "@infrastructure/models/group-role.model";

const security = new Sequelize({
    dialect: environment.database.security.dialect,
    host: environment.database.security.host,
    port: environment.database.security.port,
    username: environment.database.security.username,
    password: environment.database.security.password,
    database: environment.database.security.database,
    difine: {
        timestamps: false
    },
    dialectOptions: {
        typeCast: (field: any, next: any) => {
            if (field.type == "DATETIME" || field.type == "TIMESTAMP") {
                return new Date(field.string() + "Z");
            }
            return next();
        }
    },
    logging: false,
    timezone: "-03:00",
    models: [
        Agent,
        Claim,
        Credential,
        Group,
        Policy,
        Role,
        Secret,
        User,
        GroupRole,
        GroupClaim,
        UserPolicy,
        PolicyGroup
    ]
} as SequelizeOptions);

export { security };
