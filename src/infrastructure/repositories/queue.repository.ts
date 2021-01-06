import { IQueueRepository } from "@domain/repositories/queue.repository";

export class QueueRepository implements IQueueRepository {
    async publish(queue: string, model: any): Promise<void> {

    }

    async subscribe(queue: string, model: any): Promise<void> {

    }
}