export class UserResponse {
    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }
    
    id: string;
    username: string;
}