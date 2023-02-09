import { IEnum } from './i-enum';
import { IEnumItem } from './i-enum-item';

export interface IEnumFactory {
    build<T extends IEnumItem>(name: string): IEnum<T>;
}