export class KafkaPayload {
    public payload_id: string;
    public message: any;
    public message_type: string;
    public topic_name: string;
    public created_time?: string;

    create?(payload_id: string, message: any, message_type: string, topic_name: string): KafkaPayload {
        return {
            payload_id,
            message,
            message_type,
            topic_name,
            created_time: new Date().toISOString()
        };
    }
}

export declare class KafkaConfig {
    clientId: string;
    groupId: string;
    brokers: string[];
}