export interface IQueueRepository {
    publish(queue: string, model: any): Promise<void>;
    subscribe(queue: string, model: any): Promise<void>;
}