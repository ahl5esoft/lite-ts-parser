export interface IParser {
    parse(v: any): Promise<any>;
}