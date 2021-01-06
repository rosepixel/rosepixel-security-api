export interface IRedisRepository {
    get(key: string): Promise<void>;
    create(key: string, model: any): Promise<void>;
    update(key: string, model: any): Promise<void>;
    remove(key: string,): Promise<void>;
}