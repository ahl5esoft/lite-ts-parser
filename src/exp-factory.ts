import { BigIntegerExp } from './big-integer-exp';
import { DefaultExp } from './default-exp';

export class ExpFactory {
    public build(exp: string) {
        return exp.includes('e') ? new BigIntegerExp(exp) : new DefaultExp(exp);
    }
}