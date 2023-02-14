import { deepStrictEqual } from 'assert';
import { Mock, mockAny } from 'lite-ts-mock';

import { IEnum, IEnumFactory, IEnumItem } from './i-enum-factory';
import { ToValueParser as Self } from './to-value-parser';
import { ValueTypeData } from './value-type-data';

describe('src/to-value-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('negative', async () => {
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

            const res = await self.parse(`金币*-13140`);
            deepStrictEqual(res, {
                count: -13140,
                valueType: 1,
            });
        });

        it('positive', async () => {
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

            const res = await self.parse(`金币*13140`);
            deepStrictEqual(res, {
                count: 13140,
                valueType: 1,
            });
        });
    });
});