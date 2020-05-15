import * as gcloudPubSub from '@google-cloud/pubsub';
import { Topic } from "../topic";
import '../extensions';

export class GoogleCloudTopic implements Topic {
    readonly name: string;
    readonly pubSubClient: gcloudPubSub.PubSub;
    handler: any = undefined;

    constructor(pubSubClient: gcloudPubSub.PubSub, name: string) {
        if (name.isNullOrWhiteSpace()) {
            throw new Error('name is required.');
        }
        this.pubSubClient = pubSubClient;
        this.name = name;
    }

    async publishJSON(json: object): Promise<string> {
        return await this.pubSubClient.topic(this.name).publishJSON(json);
    }

    registerHandler(handler: (message: any) => void): void {
        if (handler === undefined) {
            throw new Error('handler is required.');
        }
        if (this.handler === undefined) {
            this.handler = handler;
            let subscriptionName = `${this.name}-subscription`;
            let subscription = this.pubSubClient.subscription(subscriptionName);
            subscription.on('message', this.internalHanlder);
        }
    }

    internalHanlder = (message: any) => {
        let gCloudMsg = message as gcloudPubSub.Message;

        try {
            this.handler(message);
            gCloudMsg.ack();
        }
        catch(err) {
            gCloudMsg.nack();
        }
    };
}
