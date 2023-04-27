import { EnumFactoryBase } from 'lite-ts-enum';

import { ExpFactory } from './exp-factory';
import { ParserFactoryBase } from './factory-base';
import { IParser } from './i-parser';
import { ToBigIntegerParser } from './to-big-integer';
import { ValueTypeData } from './value-type-data';

export class ToValueParser extends ToBigIntegerParser implements IParser {
	public static reg = /^(.+)\*(-?[\.e\d]+)$/;

	public constructor(
		private m_EnumFactory: EnumFactoryBase,
	) {
		super();
	}

	public async parse(v: any) {
		const match = v.match(ToValueParser.reg);
		if (!match)
			throw new Error(`${ToValueParser.name}.parse: 无效格式(${v})`);

		const enumItem = await this.m_EnumFactory.build({
			app: 'config',
			areaNo: ParserFactoryBase.areaNo,
			ctor: ValueTypeData
		}).get(cr => {
			return cr.text == match[1];
		});
		if (!enumItem)
			throw new Error(`${ToValueParser.name}.parse: 无效数值名(${v})`);

		let count = 0;
		if (match[2].includes('e')) {
			count = await super.parse(match[2]);
		} else {
			count = Number(match[2]);
			if (isNaN(count))
				throw new Error(`${ToValueParser.name}.parse: 无效数值数量(${v})`);
		}

		const expString = enumItem.parser?.exp ?? '';
		if (expString)
			count = new ExpFactory().build(expString).eval(count);

		return {
			count,
			valueType: enumItem.value,
		};
	}
}
