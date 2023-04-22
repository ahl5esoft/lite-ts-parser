import moment from 'moment';

import { IParser } from './i-parser';

export class ToUnixParser implements IParser {
	public async parse(v: any) {
		try {
			return moment(v).unix();
		} catch {
			return 0;
		}
	}
}
