
export class BigIntegerBase {
    public static reg = /^(-?\d+(.\d+)?)e(\d+)$/i;

    public async change(v: any) {
        if (typeof v == 'string') {
            const match = v.match(BigIntegerBase.reg);
            const numString = parseFloat(match[1]) * Math.pow(10, parseInt(match[3]));
            return numString.toString();
        }
        return v;
    }
}
