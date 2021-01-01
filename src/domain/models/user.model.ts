import { IUser } from "./interfaces/user.model";

export class User implements IUser {
    constructor(user_id: string, username: string) {
        this.user_id = user_id;
        this.username = username;
    }

    user_id: string;
    username: string;
}