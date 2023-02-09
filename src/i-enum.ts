import { IEnumItem } from './i-enum-item';

export interface IEnum<T extends IEnumItem> {
    get(predicate: (item: T) => boolean): Promise<T>;
}
