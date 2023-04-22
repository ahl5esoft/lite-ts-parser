import { deepStrictEqual } from 'assert';
import { Enum, EnumFactoryBase, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ParserFactoryBase } from './factory-base';
import { ToRewardsParser as Self } from './to-rewards';
import { ValueTypeData } from './value-type-data';

describe('src/to-rewards.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<EnumFactoryBase>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<Enum<EnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build({
                    app: 'config',
                    areaNo: ParserFactoryBase.areaNo,
                    ctor: ValueTypeData
                }),
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