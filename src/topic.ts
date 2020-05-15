export interface Topic {
    readonly name: string;
    
    publishJSON(json: object): Promise<string>;
    registerHandler(handler: (message: any) => void): void;
}
