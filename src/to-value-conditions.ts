import { EnumFactoryBase } from 'lite-ts-enum';
import { ValueCondition } from 'lite-ts-value';

import { ExpFactory } from './exp-factory';
import { IParser } from './i-parser';
import { ParserFactoryBase } from './factory-base';
import { ToBigIntegerParser } from './to-big-integer';
import { ValueTypeData } from './value-type-data';

export class ToValueConditionsParser extends ToBigIntegerParser implements IParser {
	public static reg = /^([^=><%-]+)(%|now-diff)*([=><]+)(-?\d+([\.e\d]+)?)$/;

	public constructor(
		private m_EnumFactory: EnumFactoryBase,
	) {
		super();
	}

	public async parse(v: any) {
		if (typeof v != 'string')
			return v;

		const lines = v.split(/\r\n|\n|\r/g);
		let res: ValueCondition[][] = [[]];
		const valueTypeEnum = this.m_EnumFactory.build({
			app: 'config',
			areaNo: ParserFactoryBase.areaNo,
			ctor: ValueTypeData,
		});
		for (const r of lines) {
			const match = r.match(ToValueConditionsParser.reg);
			if (!match) {
				if (res[res.length - 1].length) {
					res.push([]);
					continue;
				}

				throw new Error(`${ToValueConditionsParser.name}.parse: 无效数值条件格式(${r})`);
			}

			const enumItem = await valueTypeEnum.get((cr) => {
				return cr.text == match[1];
			});
			if (!enumItem)
				throw new Error(`${ToValueConditionsParser.name}.parse: 无效数值条件名(${r})`);

			let count = 0;
			if (match[4].includes('e')) {
				count = await super.parse(match[4]);
			} else {
				count = Number(match[4]);
				if (isNaN(count))
					throw new Error(`${ToValueConditionsParser.name}.parse: 无效数值条件数量(${r})`);
			}

			if (enumItem.parser?.exp)
				count = new ExpFactory().build(match[4], enumItem.parser.exp).eval(count);

			res[res.length - 1].push({
				count,
				op: match[2] && match[2] + match[3] || match[3],
				valueType: enumItem.value,
			});
		}
		return res;
	}
}
