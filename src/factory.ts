import { EnumFactoryBase } from 'lite-ts-enum';

import { IParser } from './i-parser';
import { ParserFactoryBase } from './factory-base';
import { ParserType } from './type';
import { ToBoolParser } from './to-bool';
import { ToBigIntegerParser } from './to-big-integer';
import { ToEnumValueParser } from './to-enum-value';
import { ToJsonParser } from './to-json';
import { ToNumberParser } from './to-number';
import { ToRewardsParser } from './to-rewards';
import { ToTwoValuesParser } from './to-two-values';
import { ToUnixParser } from './to-unix';
import { ToValueConditionsParser } from './to-value-conditions';
import { ToValuesParser } from './to-values';

export class ParserFactory extends ParserFactoryBase {
    private m_DefaultParser = {
        parse(v) {
            return v;
        },
    } as IParser;
    private m_Parser: { [type: string]: IParser; };
    protected get parser() {
        if (!this.m_Parser) {
            const toValuesParser = new ToValuesParser(this.m_EnumFactory);
            this.m_Parser ??= {
                ...this.m_ExtParser,
                [ParserType.bool]: new ToBoolParser(),
                [ParserType.enumValue]: new ToEnumValueParser(this.m_EnumFactory),
                [ParserType.json]: new ToJsonParser(),
                [ParserType.number]: new ToNumberParser(),
                [ParserType.rewards]: new ToRewardsParser(this.m_EnumFactory),
                [ParserType.twoValues]: new ToTwoValuesParser(this.m_EnumFactory),
                [ParserType.unix]: new ToUnixParser(),
                [ParserType.valueConditions]: new ToValueConditionsParser(this.m_EnumFactory),
                [ParserType.values]: toValuesParser,
                [ParserType.bigint]: new ToBigIntegerParser()
            };
        }
        return this.m_Parser;
    }

    public constructor(
        private m_EnumFactory: EnumFactoryBase,
        private m_ExtParser: { [alias: string]: IParser; },
        private m_AliasOfType: { [alias: string]: string; }
    ) {
        super();
    }

    public build(typeOrAlias: string) {
        return this.parser[typeOrAlias] ?? this.parser[this.m_AliasOfType[typeOrAlias]] ?? this.m_DefaultParser;
    }
}