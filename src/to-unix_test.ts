import { strictEqual } from 'assert';
import moment from 'moment';

import { ToUnixParser as Self } from './to-unix';

describe('src/to-unix.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const self = new Self();

            const nowTime = moment('2023-01-01');
            const timeStr = nowTime.format('YYYY-MM-DD');
            const res = await self.parse(timeStr);
            strictEqual(
                res,
                nowTime.unix(),
            );
        });
    });
});