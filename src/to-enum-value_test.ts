import { strictEqual } from 'assert';
import { Enum, EnumFactoryBase, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ParserFactoryBase } from './factory-base';
import { ToEnumValueParser as Self } from './to-enum-value';

describe('src/to-enum-value.ts', () => {
    describe('.parse(v: ToEnumValueParseOption)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<EnumFactoryBase>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<Enum<EnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build({
                    app: 'cc',
                    areaNo: ParserFactoryBase.areaNo,
                    name: 'enum'
                }),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 5
                }
            );

            const res = await self.parse({
                app: 'cc',
                enumName: 'enum',
                itemField: 'f',
                itemValue: 'v'
            });
            strictEqual(res, 5);
        });
    });
});