import { IParser } from './i-parser';

export abstract class ParserFactoryBase {
    public static areaNo = 0;

    public abstract build(type?: any): IParser;
}