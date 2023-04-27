import { IExp } from './i-exp';

export class BigIntegerExp implements IExp {
    private regex = /\d+/;

    public constructor(
        private exp: string
    ) { }

    public eval(count: number) {
        const matches = this.exp.match(this.regex);
        const symbol = this.exp.substring(matches.index - 1, matches.index);
        return (eval(`${BigInt(matches[0])}${symbol}${BigInt(count)}`)).toString();
    }
}