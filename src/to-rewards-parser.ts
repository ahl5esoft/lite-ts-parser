import { EnumFactoryBase, Value, ValueTypeData } from 'lite-ts-enum';

import { IParser } from './i-parser';

interface IReward extends Value {
	weight?: number;
}

export class ToRewardsParser implements IParser {
	public static reg = /^([^*]+)\*(-?\d+)(\*?(\d+))?$/;

	public constructor(
		private m_EnumFactory: EnumFactoryBase,
	) { }

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

			const count = Number(match[2]);
			if (isNaN(count))
				throw new Error(`${ToRewardsParser.name}.parse: 无效奖励数量(${r})`);

			res[res.length - 1].push({
				count,
				valueType: enumItem.value,
				weight: match[3] && Number(match[4]) || 0,
			});
		}
		return res;
	}
}
