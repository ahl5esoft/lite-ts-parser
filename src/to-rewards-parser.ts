import { EnumFactoryBase, Value, ValueTypeData } from 'lite-ts-enum';

import { BigIntegerBase } from './big-integer-base';
import { IParser } from './i-parser';

interface IReward extends Value {
	weight?: number;
}

export class ToRewardsParser extends BigIntegerBase implements IParser {
	public static reg = /^(\D+)(\d+(?:e\d+)?)?(\*\d+)?(\d+)?$/;

	public constructor(
		private m_EnumFactory: EnumFactoryBase,
	) {
		super();
	}

	public async parse(v: any) {
		if (typeof v != 'string')
			return v;

		const lines = v.split(/\r\n|\n|\r/g);
		const res: IReward[][] = [[]];
		const valueTypeEnum = this.m_EnumFactory.build<ValueTypeData>('ValueTypeData');
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
				count = this.change(match[2]);
			} else {
				count = Number(match[2]);
				if (isNaN(count))
					throw new Error(`${ToRewardsParser.name}.parse: 无效奖励数量(${r})`);
			}

			if (enumItem.parser?.exp)
				count = eval(enumItem.parser.exp)(count);

			res[res.length - 1].push({
				count,
				valueType: enumItem.value,
				weight: match[3] && Number(match[3].slice(1)) || 0,
			});
		}
		return res;
	}
}
