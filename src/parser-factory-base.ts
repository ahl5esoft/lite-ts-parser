import { IParser } from './i-parser';

export abstract class ParserFactoryBase {
    public abstract build(type?: any): IParser;
}