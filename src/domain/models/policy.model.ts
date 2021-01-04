import { IGroup } from "@domain/models/group.model";

export interface IPolicy {
    policyId: string;
    name: string;
    description: string;
    createdAt: Date;
    groups: IGroup[]
}