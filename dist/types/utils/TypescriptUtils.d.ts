/**
 * Gets config from current directory package.json file
 */
export declare const pkgConfig: (baseDir?: string) => Promise<any>;
/**
 * Gets ts config from current directory safely
 */
export declare const tsConfig: () => Promise<any>;
