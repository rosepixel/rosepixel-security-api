import { IUserRepository } from "@domain/interfaces/user.repository";

import { injectable } from "inversify";

import { User } from "@domain/models/user.model";

@injectable()
export class UserRepository implements IUserRepository {
    getById(id: string): User {
        console.log("ok");
        return new User("xpto", "baca");
    }
}