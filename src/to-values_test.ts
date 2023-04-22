import { deepStrictEqual } from 'assert';
import { Enum, EnumFactory, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ParserFactoryBase } from './factory-base';
import { ToValuesParser as Self } from './to-values';
import { ValueTypeData } from './value-type-data';

describe('src/to-values.ts', () => {
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
                    value: 1,
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
                    value: 2,
                }
            );

            const res = await self.parse(`金币*-13020200000
钻石*4`);
            deepStrictEqual(res, [{
                count: -13020200000,
                valueType: 1,
            }, {
                count: 4,
                valueType: 2,
            }]);
        });
    });
});