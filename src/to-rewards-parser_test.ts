import { deepStrictEqual } from 'assert';
import { Enum, EnumFactoryBase, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ToRewardsParser as Self } from './to-rewards-parser';

describe('src/to-rewards-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<EnumFactoryBase>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<Enum<EnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
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

钻石*7e10`);
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
                    count: '70000000000',
                    valueType: 2,
                    weight: 0
                }]
            ]);
        });
    });
});