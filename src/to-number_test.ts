import { strictEqual } from 'assert';

import { ToNumberParser as Self } from './to-number';

describe('src/to-number.ts', () => {
    describe('.parse(v: any)', () => {
        it('string', async () => {
            const self = new Self();

            const res = await self.parse('55');
            strictEqual(res, 55);
        });

        it('ok', async () => {
            const self = new Self();

            const res = await self.parse(0);
            strictEqual(res, 0);
        });
    });
});