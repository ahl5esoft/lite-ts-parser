import { strictEqual } from 'assert';
import { IParser } from './i-parser';

import { ParserFactory as Self } from './factory';
import { ParserType } from './type';
import { ToBoolParser } from './to-bool';

describe('src/factory.ts', () => {
    describe('.build(type: string)', () => {
        it('default', () => {
            const self = new Self(null, {}, {});

            const res = self.build(ParserType.bool);
            strictEqual(
                res.constructor,
                ToBoolParser
            );
        });

        it('alias', () => {
            const self = new Self(null, {}, {
                boolean: ParserType.bool
            });

            const res = self.build('boolean');
            strictEqual(
                res.constructor,
                ToBoolParser
            );
        });

        it('custom', () => {
            class CustomParser implements IParser {
                public async parse(v: any) {
                    return 'c_' + v;
                }
            }

            const self = new Self(null, {
                custom: new CustomParser(),
            }, {});

            const res = self.build('custom');
            strictEqual(
                res.constructor,
                CustomParser
            );
        });
    });
});