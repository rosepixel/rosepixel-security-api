import { Claim } from "@models/claim/claim.entity";
import { Group } from "@models/group/group.entity";
import { Policy } from "@models/policy/policy.entity";
import { Role } from "@models/role/role.entity";
import { User } from "@models/user/user.entity";

export const MySqlConfig = {
    type: "mysql",
    host: process.env.ORM_HOST || "localhost",
    port: parseInt(process.env.ORM_PORT) || 3306,
    username: process.env.ORM_USERNAME || "root",
    password: process.env.ORM_PASSWORD || "develop",
    database: process.env.ORM_DATABASE || "security",
    entities: [Claim, Group, Policy, Role, User],
    synchronize: true
};