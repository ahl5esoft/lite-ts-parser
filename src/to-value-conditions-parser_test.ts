import { deepStrictEqual } from 'assert';
import { Enum, EnumFactory, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ToValueConditionsParser as Self } from './to-value-conditions-parser';

describe('src/to-value-conditions-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<EnumFactory>();
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
                    value: 2,
                }
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 3,
                }
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 4,
                }
            );

            const res = await self.parse(`A>5e10
B<6

C%=7

Dnow-diff>8`);
            deepStrictEqual(res, [
                [{
                    count: '50000000000',
                    op: '>',
                    valueType: 1
                }, {
                    count: 6,
                    op: '<',
                    valueType: 2
                }],
                [{
                    count: 7,
                    op: '%=',
                    valueType: 3
                }],
                [{
                    count: 8,
                    op: 'now-diff>',
                    valueType: 4
                }]
            ]);
        });

        it('parser.exp', async () => {
            const mockEnumFactory = new Mock<EnumFactory>();
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
                    parser: {
                        exp: '(count)=>{return count*10000}'
                    }
                }
            );

            const res = await self.parse(`充值=13140`);
            deepStrictEqual(res, [
                [{
                    count: 131400000,
                    op: '=',
                    valueType: 1
                }]
            ]);
        });
    });



});