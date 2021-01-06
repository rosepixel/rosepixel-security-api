

class Receiver {
    broker: Broker;

    constructor() {
        this.broker = new Broker({
            connection: {
                user: process.env.QUEUE_USERNAME,
                pass: process.env.QUEUE_PASSWORD,
                host: process.env.QUEUE_SERVER || 'localhost',
                port: process.env.QUEUE_PORT || '5672',
                timeout: 2000,
                name: "rabbitmq"
            },
            exchanges: [
                { name: "work.tasks.exchange", type: "topic", options: { publishTimeout: 1000, persistent: true, durable: false } },
                { name: "work.reply.exchange", type: "topic", options: { publishTimeout: 1000, persistent: true, durable: false } }
            ],
            queues: [
                { name: "work.tasks.queue", options: { limit: 1000, queueLimit: 1000 } },
                { name: "work.reply.queue", options: { limit: 1000, queueLimit: 1000 } }
            ],
            binding: [
                { exchange: "work.tasks.exchange", target: "work.tasks.queue", keys: "somekey.#" },
                { exchange: "work.reply.exchange", target: "work.reply.queue", keys: "otherkey.#" }
            ],
            logging: {
                adapters: {
                    stdOut: {
                        level: 3,
                        bailIfDebug: true
                    }
                }
            }
        });
    }

    async init() {
        await this.broker.connect();

        this.broker.addConsume("work.tasks.queue", this.taskCB.bind(this));
        this.broker.addConsume("work.reply.queue", this.replyCB.bind(this));
    }

    taskCB(msg) {
      ...
    }

    replyCB(msg) {
      ...
    }
}