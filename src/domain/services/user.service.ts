import { inject, injectable } from "inversify";

import { INJECTION } from "@utilities/injection";

import { IUser } from "@domain/models/user.model";

import { IUserRepository } from "@domain/interfaces/user.repository";

@injectable()
export class UserService {

    private _userRepository: IUserRepository;

    constructor(@inject(INJECTION.IUserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async validate(user_id: string): Promise<IUser> {
        const user: IUser | null = await this._userRepository.getById(user_id);

        if (user === null) {
            throw Error("Usuário não encontrado");
        }

        return user;
    }
}