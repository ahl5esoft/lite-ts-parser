import { IExp } from './i-exp';

export class DefaultExp implements IExp {
    public constructor(
        private exp: string
    ) { }

    public eval(count: number) {
        return eval(this.exp)(count);
    }
}