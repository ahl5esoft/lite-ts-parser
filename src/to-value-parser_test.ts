import { deepStrictEqual } from 'assert';
import { Mock, mockAny } from 'lite-ts-mock';

import { IEnum, IEnumFactory, IEnumItem } from './i-enum-factory';
import { ToValueParser as Self } from './to-value-parser';

describe('src/to-value-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('negative', async () => {
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

        it('parser.exp', async () => {
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
                    value: 1,
                    parser: {
                        exp: 'count*10000'
                    }
                }
            );

            const res = await self.parse(`金币*13140`);
            deepStrictEqual(res, {
                count: 131400000,
                valueType: 1,
            });
        });
    });
});