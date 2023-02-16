import { deepStrictEqual } from 'assert';
import { Mock, mockAny } from 'lite-ts-mock';

import { IEnum, IEnumFactory, IEnumItem } from './i-enum-factory';
import { ToTwoValuesParser as Self } from './to-two-values-parser';

describe('src/to-two-values-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<IEnum<IEnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 4,
                }
            );

            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 5,
                }
            );

            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 6,
                }
            );

            const res = await self.parse(`A*1
B*2

-

C*3`);
            deepStrictEqual(res, [
                [{
                    count: 1,
                    valueType: 4,
                }, {
                    count: 2,
                    valueType: 5,
                }],
                [],
                [{
                    count: 3,
                    valueType: 6
                }]
            ]);
        });
    });
});