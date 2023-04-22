import { deepStrictEqual, strictEqual } from 'assert';

import { ToJsonParser as Self } from './to-json';

describe('src/to-json.ts', () => {
    describe('.parse(v: any)', () => {
        it('string', async () => {
            const self = new Self();

            const res = await self.parse(
                JSON.stringify([1, 2, 3])
            );
            deepStrictEqual(res, [1, 2, 3]);
        });

        it('ok', async () => {
            const self = new Self();

            const res = await self.parse(0);
            strictEqual(res, 0);
        });
    });
});