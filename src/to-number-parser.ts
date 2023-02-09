import { IParser } from './i-parser';

export class ToNumberParser implements IParser {
	public async parse(v: any) {
		return Number(v);
	}
}
