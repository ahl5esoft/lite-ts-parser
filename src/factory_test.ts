import { strictEqual } from 'assert';

import { ToBoolParser } from './to-bool';
import { ParserFactory as Self } from './factory';

describe('src/lite/src/service/parser/factory.ts', () => {
    describe('.build(type: string)', () => {
        it('default', () => {
            const self = new Self(null, {});

            const res = self.build('test');
            strictEqual(
                res,
                Reflect.get(self, 'm_DefaultParser')
            );
        });

        it('ok', () => {
            const self = new Self(null, {});

            const res = self.build('bool');
            strictEqual(
                res.constructor,
                ToBoolParser
            );
        });
    });
});