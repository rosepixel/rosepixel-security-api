import { IRole } from "@domain/models/role.model";
import { IClaim } from "@domain/models/claim.model";

export interface IGroup {
    groupId: string;
    name: string;
    description: string;
    createdAt: Date;
    roles: IRole[],
    claims: IClaim[]
}