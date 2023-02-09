import { IEnumFactory } from './i-enum-factory';
import { IParser } from './i-parser';
import { IValue } from './i-value';
import { ValueTypeData } from './value-type-data';

export class ToValuesParser implements IParser {
	public static reg = /^(.+)*(-?\d+)$/;

	public constructor(
		private m_EnumFactory: IEnumFactory,
	) { }

	public async parse(v: any) {
		if (typeof v != 'string')
			return v;

		const lines = v.split(/\r\n|\n|\r/g);
		const res: IValue[] = [];
		const valueTypeEnum = this.m_EnumFactory.build<ValueTypeData>(ValueTypeData.name);
		for (const r of lines) {
			const match = r.match(ToValuesParser.reg);
			if (!match) throw new Error(`${ToValuesParser.name}.parse: 无效格式(${r})`);

			const enumItem = await valueTypeEnum.get((cr) => {
				return cr.text == match[1];
			});
			if (!enumItem)
				throw new Error(`${ToValuesParser.name}.parse: 无效数值名(${r})`);

			const count = Number(match[2]);
			if (isNaN(count) || count == 0)
				throw new Error(`${ToValuesParser.name}.parse: 无效数值数量(${r})`);

			res.push({
				count,
				valueType: enumItem.value,
			});
		}
		return res;
	}
}
