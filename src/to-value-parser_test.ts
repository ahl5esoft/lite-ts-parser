import { deepStrictEqual } from 'assert';
import { Enum, EnumFactoryBase, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ToValueParser as Self } from './to-value-parser';

describe('src/to-value-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('negative', async () => {
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

            const res = await self.parse(`金币*-13140`);
            deepStrictEqual(res, {
                count: -13140,
                valueType: 1,
            });
        });

        it('positive', async () => {
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

            const res = await self.parse(`金币*13140`);
            deepStrictEqual(res, {
                count: 13140,
                valueType: 1,
            });
        });
    });
});