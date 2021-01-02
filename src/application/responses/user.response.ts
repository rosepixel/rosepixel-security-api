export class UserResponse {
    constructor(user_id?: string, username?: string, email?: string, created_at?: Date, updated_at?: Date) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    user_id?: string;
    username?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
}