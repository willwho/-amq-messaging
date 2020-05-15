import { Topic } from './topic';

export interface Provider {
    topic(name: string): Topic;
}
