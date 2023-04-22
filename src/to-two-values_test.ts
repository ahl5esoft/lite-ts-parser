import { deepStrictEqual } from 'assert';
import { Enum, EnumFactory, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ParserFactoryBase } from './factory-base';
import { ToTwoValuesParser as Self } from './to-two-values';
import { ValueTypeData } from './value-type-data';

describe('src/to-two-values.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<EnumFactory>();
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
                    value: 4,
                }
            );

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
                    value: 5,
                }
            );

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