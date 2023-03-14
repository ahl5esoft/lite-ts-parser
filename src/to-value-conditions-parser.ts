import { IEnumFactory } from './i-enum-factory';
import { IParser } from './i-parser';
import { IValue } from './i-value';

interface IValueCondition extends IValue {
	op: string;
}

export class ToValueConditionsParser implements IParser {
	public static reg = /^([^=><%-]+)(%|now-diff)*([=><]+)(-?\d+(\.?\d+)?)$/;

	public constructor(
		private m_EnumFactory: IEnumFactory,
	) { }

	public async parse(v: any) {
		if (typeof v != 'string')
			return v;

		const lines = v.split(/\r\n|\n|\r/g);
		let res: IValueCondition[][] = [[]];
		const valueTypeEnum = this.m_EnumFactory.build('ValueTypeData');
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

			let count = Number(match[4]);
			if (isNaN(count))
				throw new Error(`${ToValueConditionsParser.name}.parse: 无效数值条件数量(${r})`);

			if (enumItem.parser?.exp)
				count = eval(enumItem.parser.exp)(count);

			res[res.length - 1].push({
				count,
				op: match[2] && match[2] + match[3] || match[3],
				valueType: enumItem.value,
			});
		}
		return res;
	}
}
