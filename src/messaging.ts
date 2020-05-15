import './extensions';
import { Provider } from './Provider';

export class Messaging {
    provider: Provider;

    constructor(provider: Provider) {
        if(!provider) {
            throw new Error('provider is required.');
        }

        this.provider = provider;
    }
}


