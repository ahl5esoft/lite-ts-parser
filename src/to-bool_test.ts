import { strictEqual } from 'assert';

import { ToBoolParser as Self } from './to-bool';

describe('src/to-bool.ts', () => {
    describe('.parse(v: any)', () => {
        it('bool', async () => {
            const self = new Self();

            const res = await self.parse(true);
            strictEqual(res, true);
        });

        it('string', async () => {
            const self = new Self();

            const res = await self.parse('true');
            strictEqual(res, true);
        });

        it('ok', async () => {
            const self = new Self();

            const res = await self.parse(0);
            strictEqual(res, false);
        });
    });
});