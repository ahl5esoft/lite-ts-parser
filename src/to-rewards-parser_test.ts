import { deepStrictEqual } from 'assert';
import { Mock, mockAny } from 'lite-ts-mock';

import { IEnum, IEnumFactory, IEnumItem } from './i-enum-factory';
import { ToRewardsParser as Self } from './to-rewards-parser';
import { ValueTypeData } from './value-type-data';

describe('src/to-rewards-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<IEnum<IEnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build(ValueTypeData.name),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 1,
                }
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 1,
                }
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 2,
                }
            );

            const res = await self.parse(`金币*3*4
金币*5*6

钻石*7`);
            deepStrictEqual(res, [
                [{
                    count: 3,
                    valueType: 1,
                    weight: 4
                }, {
                    count: 5,
                    valueType: 1,
                    weight: 6
                }],
                [{
                    count: 7,
                    valueType: 2,
                    weight: 0
                }]
            ]);
        });
    });
});