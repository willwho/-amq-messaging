import * as gcloudPubSub from '@google-cloud/pubsub';
import { GoogleCloudTopic } from './googleCloudTopic';
import { Topic } from '../topic';
import { Provider } from '../provider';
import '../extensions';

export class GoogleCloudPubSubProvider implements Provider {
    readonly projectId: string;
    readonly pubSubClient: gcloudPubSub.PubSub;
    topics: Array<Topic> = new Array<Topic>();

    constructor(projectId: string) {
        if (projectId.isNullOrWhiteSpace()) {
            throw new Error('projectId is required.');
        }
        this.projectId = projectId;
        this.pubSubClient = new gcloudPubSub.PubSub({ projectId });
    }
    
    topic(name: string): Topic {
        if (name.isNullOrWhiteSpace()) {
            throw new Error('name is required.');
        }
        let topic = this.topics.find(c => c.name.equalsCaseInsensitive(name));
        if (topic) {
            return topic;
        }
        let newTopic = new GoogleCloudTopic(this.pubSubClient, name);
        this.topics.push(newTopic);
        return newTopic;
    }
}
