import { IParser } from './i-parser';

export class ToBoolParser implements IParser {
    public async parse(v: any) {
        if (typeof v == 'boolean')
            return v;

        if (typeof v == 'string')
            return v.toLocaleLowerCase() == 'true';

        return !!v;
    }
}