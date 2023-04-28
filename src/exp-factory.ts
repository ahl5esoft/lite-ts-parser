import { BigIntegerExp } from './big-integer-exp';
import { DefaultExp } from './default-exp';

export class ExpFactory {
    public build(match: string, exp: string) {
        return match.includes('e') ? new BigIntegerExp(exp) : new DefaultExp(exp);
    }
}