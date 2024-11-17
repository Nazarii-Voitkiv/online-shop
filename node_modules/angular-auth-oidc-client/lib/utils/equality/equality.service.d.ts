import * as i0 from "@angular/core";
export declare class EqualityService {
    isStringEqualOrNonOrderedArrayEqual(value1: string | any[], value2: string | any[]): boolean;
    areEqual(value1: string | any[] | any | null | undefined, value2: string | any[] | any | null | undefined): boolean;
    private oneValueIsStringAndTheOtherIsArray;
    private bothValuesAreObjects;
    private bothValuesAreStrings;
    private bothValuesAreArrays;
    private valueIsString;
    private valueIsObject;
    private arraysStrictEqual;
    private arraysHaveEqualContent;
    private isNullOrUndefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<EqualityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EqualityService>;
}
