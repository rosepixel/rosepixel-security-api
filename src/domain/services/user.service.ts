import { inject, injectable } from "inversify";

import { INJECTION } from "@utilities/injection";

import { IUser } from "@domain/models/user.model";

import { IUserService } from "./interfaces/user.service";

import { IUserRepository } from "@domain/interfaces/user.repository";

@injectable()
export class UserService implements IUserService {

    private _userRepository: IUserRepository;

    constructor(@inject(INJECTION.IUserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async validateById(user_id: string): Promise<IUser> {
        const user: IUser | null = await this._userRepository.getById(user_id);

        if (user === null) {
            throw Error("Usuário não encontrado");
        }

        return user;
    }

    async validateByEmailAndPassword(email: string, password: string): Promise<IUser> {
        const user: IUser | null = await this._userRepository.getByEmailAndPassword(email, password);

        if (user === null) {
            throw Error("Email e senha não correspondem");
        }

        return user;
    }
}