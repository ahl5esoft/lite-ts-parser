import { IParser } from './i-parser';

export class ToJsonParser implements IParser {
    public async parse(v: any) {
        return typeof v == 'string' ? JSON.parse(v) : v;
    }
}
