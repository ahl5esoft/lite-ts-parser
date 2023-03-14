import { ValueTypeData } from 'lite-ts-enum';

export interface IEnumItem extends ValueTypeData {
    readonly key?: string;
}

export interface IEnum<T extends IEnumItem> {
    get(predicate: (item: T) => boolean): Promise<T>;
}

export interface IEnumFactory {
    build<T extends IEnumItem>(name: string): IEnum<T>;
}