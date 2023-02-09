import { deepStrictEqual } from 'assert';
import { Mock } from 'lite-ts-mock';

import { IParser } from './i-parser';
import { ToTwoValuesParser as Self } from './to-two-values-parser';

describe('src/to-two-values-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockParser = new Mock<IParser>();
            const self = new Self(mockParser.actual);

            mockParser.expectReturn(
                r => r.parse('r'),
                ['a']
            );

            const res = await self.parse(`-
r`);
            deepStrictEqual(res, [
                [],
                ['a'],
            ]);
        });
    });
});