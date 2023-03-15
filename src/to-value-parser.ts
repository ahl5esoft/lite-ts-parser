import { EnumFactoryBase } from 'lite-ts-enum';

import { IParser } from './i-parser';

export class ToValueParser implements IParser {
	public static reg = /^(.+)\*(-?\d+)$/;

	public constructor(
		private m_EnumFactory: EnumFactoryBase,
	) { }

	public async parse(v: any) {
		const match = v.match(ToValueParser.reg);
		if (!match)
			throw new Error(`${ToValueParser.name}.parse: 无效格式(${v})`);

		const enumItem = await this.m_EnumFactory.build('ValueTypeData').get(cr => {
			return cr.text == match[1];
		});
		if (!enumItem)
			throw new Error(`${ToValueParser.name}.parse: 无效数值名(${v})`);

		const count = Number(match[2]);
		if (isNaN(count))
			throw new Error(`${ToValueParser.name}.parse: 无效数值数量(${v})`);

		return {
			count,
			valueType: enumItem.value,
		};
	}
}
