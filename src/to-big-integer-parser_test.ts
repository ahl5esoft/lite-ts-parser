import { strictEqual } from 'assert';

import { ToBigIntegerParser as Self } from './to-big-integer-parser';

describe('src/to-big-integer-parser.ts', () => {
    describe('.build(type: string)', () => {
        it('default', async () => {
            const self = new Self();
            const res = await self.parse('117e6');
            strictEqual(res, '117000000');
        });
    });
});