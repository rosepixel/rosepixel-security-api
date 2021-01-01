export class UserResponse {
    constructor(user_id: string, username: string) {
        this.user_id = user_id;
        this.username = username;
    }
    
    user_id: string;
    username: string;
}