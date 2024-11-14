import { names } from '@nx/devkit';
export declare function buildSelector(name: string, prefix: string | undefined, projectPrefix: string | undefined, casing: keyof Pick<ReturnType<typeof names>, 'fileName' | 'propertyName'>): string;
export declare function validateHtmlSelector(selector: string): void;
