import { EnumFactoryBase } from 'lite-ts-enum';

import { IParser } from './i-parser';
import { ParserFactoryBase } from './parser-factory-base';
import { ParserType } from './parser-type';
import { ToBoolParser } from './to-bool-parser';
import { ToBigIntegerParser } from './to-big-integer-parser';
import { ToEnumValueParser } from './to-enum-value-parser';
import { ToJsonParser } from './to-json-parser';
import { ToNumberParser } from './to-number-parser';
import { ToRewardsParser } from './to-rewards-parser';
import { ToTwoValuesParser } from './to-two-values-parser';
import { ToUnixParser } from './to-unix-parser';
import { ToValueConditionsParser } from './to-value-conditions-parser';
import { ToValuesParser } from './to-values-parser';

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
        private m_AliasOfType: { [alias: string]: string; },
    ) {
        super();
    }

    public build(typeOrAlias: string) {
        return this.parser[typeOrAlias] ?? this.parser[this.m_AliasOfType[typeOrAlias]] ?? this.m_DefaultParser;
    }
}