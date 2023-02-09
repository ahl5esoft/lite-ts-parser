import { IParser } from './i-parser';

export class ToTwoValuesParser implements IParser {
    public static emptyLine = '-';

    public constructor(
        private m_ToValueParser: IParser,
    ) { }

    public async parse(v: any) {
        if (typeof v != 'string')
            return v;

        const lines = v.split(/\r\n|\n|\r/g);
        const res = [];
        for (const r of lines) {
            let childRes = [];
            if (r != ToTwoValuesParser.emptyLine)
                childRes = await this.m_ToValueParser.parse(r);
            res.push(childRes);
        }
        return res;
    }
}
