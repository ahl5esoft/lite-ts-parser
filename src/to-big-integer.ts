
import { IParser } from './i-parser';

export class ToBigIntegerParser implements IParser {
	public static reg = /^(-?\d+(.\d+)?)e(\d+)$/i;

	public async parse(v: any) {
		if (typeof v == 'string' && v.includes('e')) {
			const match = v.match(ToBigIntegerParser.reg);
			if (!match)
				throw new Error(`错误的大数格式: ${v}`);

			const [_, num, __, pow] = match;
			let numStr: string;
			if (num.includes('.')) {
				const index = num.indexOf('.');
				numStr = num.replace('.', '').padEnd(Number(pow) + index, '0');
			} else {
				numStr = num.padEnd(num.length + Number(pow), '0');
			}
			return numStr;
		}
		return v;
	}
}
