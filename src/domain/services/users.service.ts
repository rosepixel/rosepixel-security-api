import { inject, injectable } from "inversify";

import { INJECTION } from "@utilities/injection";

import { IUser } from "@domain/models/user.model";
import { IUsersService } from "@domain/services/interfaces/users.service";
import { IUsersRepository } from "@domain/repositories/users.repository";

@injectable()
export class UsersService implements IUsersService {

    constructor(@inject(INJECTION.IUsersRepository) private usersRepository: IUsersRepository) { }

    async validateById(user_id: string): Promise<IUser> {

        const user: IUser | null = await this.usersRepository.getById(user_id);

        if (user === null) {
            throw Error("Usuário não encontrado");
        }

        return user;
    }

    async validateByEmailAndPassword(email: string, password: string): Promise<IUser> {

        const user: IUser | null = await this.usersRepository.getByEmailAndPassword(email, password);

        if (user === null) {
            throw Error("Usuário não encontrado");
        }

        return user;
    }
}