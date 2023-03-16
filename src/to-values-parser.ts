import { Value } from 'lite-ts-enum';

import { ToValueParser } from './to-value-parser';

export class ToValuesParser extends ToValueParser {
	public async parse(v: any) {
		if (typeof v != 'string')
			return v;

		const lines = v.split(/\r\n|\n|\r/g);
		const res: Value[] = [];
		for (const r of lines) {
			res.push(
				await super.parse(r)
			);
		}
		return res;
	}
}
