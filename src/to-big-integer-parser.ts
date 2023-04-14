
import { BigIntegerBase } from './big-integer-base';
import { IParser } from './i-parser';

export class ToBigIntegerParser extends BigIntegerBase implements IParser {
	public async parse(v: any) {
		return this.change(v);
	}
}
