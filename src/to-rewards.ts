import { EnumFactoryBase } from 'lite-ts-enum';
import { Reward } from 'lite-ts-value';

import { ExpFactory } from './exp-factory';
import { IParser } from './i-parser';
import { ParserFactoryBase } from './factory-base';
import { ToBigIntegerParser } from './to-big-integer';
import { ValueTypeData } from './value-type-data';

export class ToRewardsParser extends ToBigIntegerParser implements IParser {
	public static reg = /^([^*]+)\*(-?[\de\.]+)(\*?(\d+))?$/;

	public constructor(
		private m_EnumFactory: EnumFactoryBase,
	) {
		super();
	}

	public async parse(v: any) {
		if (typeof v != 'string')
			return v;

		const lines = v.split(/\r\n|\n|\r/g);
		const res: Reward[][] = [[]];
		const valueTypeEnum = this.m_EnumFactory.build({
			app: 'config',
			areaNo: ParserFactoryBase.areaNo,
			ctor: ValueTypeData
		});
		for (const r of lines) {
			const match = r.match(ToRewardsParser.reg);
			if (!match) {
				if (res[res.length - 1].length) {
					res.push([]);
					continue;
				}

				throw new Error(`${ToRewardsParser.name}.parse: 无效奖励格式(${r})`);
			}

			const enumItem = await valueTypeEnum.get((cr) => {
				return cr.text == match[1];
			});
			if (!enumItem)
				throw new Error(`${ToRewardsParser.name}.parse: 无效奖励名(${r})`);
			let count = 0;
			if (match[2].includes('e')) {
				count = await super.parse(match[2]);
			} else {
				count = Number(match[2]);
				if (isNaN(count))
					throw new Error(`${ToRewardsParser.name}.parse: 无效奖励数量(${r})`);
			}

			if (enumItem.parser?.exp)
				count = new ExpFactory().build(match[2], enumItem.parser.exp).eval(count);

			res[res.length - 1].push({
				count,
				valueType: enumItem.value,
				weight: match[3] && Number(match[3].slice(1)) || 0,
			});
		}
		return res;
	}
}
