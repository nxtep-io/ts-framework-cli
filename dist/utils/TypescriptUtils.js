"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const JSON5 = require("json5");
const ts_framework_common_1 = require("ts-framework-common");
/**
 * Gets ts config from current directory safely
 */
exports.tsConfig = function tsConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        // Try to find tsconfig file in current directory
        const tsConfigPath = Path.resolve(process.cwd(), "tsconfig.json");
        const tsConfigRaw = fs.readFileSync(tsConfigPath);
        if (!tsConfigRaw || !tsConfigRaw.toString()) {
            throw new ts_framework_common_1.BaseError(`Could not load TS Config file from: "${tsConfigPath}"`);
        }
        // TODO: Handle exceptions here
        return JSON5.parse(tsConfigRaw.toString());
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZXNjcmlwdFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWxzL1R5cGVzY3JpcHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsNkRBQWdEO0FBRWhEOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsU0FBZSxRQUFROztRQUM3QyxpREFBaUQ7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDbEUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNDLE1BQU0sSUFBSSwrQkFBUyxDQUFDLHdDQUF3QyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsK0JBQStCO1FBQy9CLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgSlNPTjUgZnJvbSBcImpzb241XCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuXG4vKipcbiAqIEdldHMgdHMgY29uZmlnIGZyb20gY3VycmVudCBkaXJlY3Rvcnkgc2FmZWx5XG4gKi9cbmV4cG9ydCBjb25zdCB0c0NvbmZpZyA9IGFzeW5jIGZ1bmN0aW9uIHRzQ29uZmlnKCkge1xuICAvLyBUcnkgdG8gZmluZCB0c2NvbmZpZyBmaWxlIGluIGN1cnJlbnQgZGlyZWN0b3J5XG4gIGNvbnN0IHRzQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInRzY29uZmlnLmpzb25cIik7XG4gIGNvbnN0IHRzQ29uZmlnUmF3ID0gZnMucmVhZEZpbGVTeW5jKHRzQ29uZmlnUGF0aCk7XG5cbiAgaWYgKCF0c0NvbmZpZ1JhdyB8fCAhdHNDb25maWdSYXcudG9TdHJpbmcoKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENvdWxkIG5vdCBsb2FkIFRTIENvbmZpZyBmaWxlIGZyb206IFwiJHt0c0NvbmZpZ1BhdGh9XCJgKTtcbiAgfVxuXG4gIC8vIFRPRE86IEhhbmRsZSBleGNlcHRpb25zIGhlcmVcbiAgcmV0dXJuIEpTT041LnBhcnNlKHRzQ29uZmlnUmF3LnRvU3RyaW5nKCkpO1xufTtcbiJdfQ==