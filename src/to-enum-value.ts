import { EnumFactoryBase } from 'lite-ts-enum';

import { IParser } from './i-parser';
import { ParserFactoryBase } from './factory-base';

export type ToEnumValueParseOption = {
    app: string;
    enumName: string;
    itemField: string;
    itemValue: any;
}

export class ToEnumValueParser implements IParser {
    public constructor(
        private m_EnumFactory: EnumFactoryBase,
    ) { }

    public async parse(v: ToEnumValueParseOption) {
        const item = await this.m_EnumFactory.build({
            app: v.app,
            areaNo: ParserFactoryBase.areaNo,
            name: v.enumName,
        }).get(r => {
            return r[v.itemField] == v.itemValue;
        });
        return item.value ?? -1;
    }
}