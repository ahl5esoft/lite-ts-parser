import { strictEqual } from 'assert';
import { Mock, mockAny } from 'lite-ts-mock';

import { IEnum } from './i-enum';
import { IEnumFactory } from './i-enum-factory';
import { IEnumItem } from './i-enum-item';
import { ToEnumValueParser as Self } from './to-enum-value-parser';

describe('src/to-enum-value-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<IEnum<IEnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build('enum'),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 5
                }
            );

            const res = await self.parse({
                enumName: 'enum',
                itemField: 'f',
                itemValue: 'v'
            });
            strictEqual(res, 5);
        });
    });
});