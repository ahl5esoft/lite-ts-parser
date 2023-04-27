import { IExp } from './i-exp';

export class BigIntegerExp implements IExp {
    public static regex = /\d+/;

    public constructor(
        private exp: string
    ) { }

    public eval(count: number) {
        const match = this.exp.match(BigIntegerExp.regex);
        const exp = this.exp.replace(match[0], match[0] + 'n');
        return eval(exp)(BigInt(count)).toString();
    }
}