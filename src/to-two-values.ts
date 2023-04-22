import { ToValueParser } from './to-value';

export class ToTwoValuesParser extends ToValueParser {
    public static emptyLine = '-';

    public async parse(v: any) {
        if (typeof v != 'string')
            return v;

        const lines = v.split(/\r\n|\n|\r/g);
        const res = [[]];
        for (const r of lines) {
            if (r) {
                if (r != ToTwoValuesParser.emptyLine) {
                    res[res.length - 1].push(
                        await super.parse(r)
                    );
                }
            } else {
                res.push([]);
            }
        }
        return res;
    }
}
