import { strictEqual } from 'assert';

import { BigIntegerBase } from './big-integer-base';

class Self extends BigIntegerBase { }

describe('src/big-integer-base.ts', () => {
    describe('.change(v: any)', () => {
        it('1.23e6', async () => {
            const self = new Self();
            const res = self.change('1.23e6');
            strictEqual(res, '1230000');
        });

        it('123e20', async () => {
            const self = new Self();
            const res = self.change('123e20');
            strictEqual(res, '12300000000000000000000');
        });

        it('100000', async () => {
            const self = new Self();
            const res = self.change('100000');
            strictEqual(res, '100000');
        });
    });
});