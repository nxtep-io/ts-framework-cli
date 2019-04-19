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
 * Gets config from current directory package.json file
 */
exports.pkgConfig = function pkgConfig(baseDir = process.cwd()) {
    return __awaiter(this, void 0, void 0, function* () {
        // Try to find pkg file in current directory
        const pkgConfigPath = Path.resolve(baseDir, "package.json");
        const pkgConfigRaw = fs.readFileSync(pkgConfigPath);
        if (!pkgConfigRaw || !pkgConfigRaw.toString()) {
            throw new ts_framework_common_1.BaseError(`Could not load Package information file from: "${pkgConfigPath}"`);
        }
        // TODO: Handle exceptions here
        return JSON5.parse(pkgConfigRaw.toString());
    });
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZXNjcmlwdFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWxzL1R5cGVzY3JpcHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsNkRBQWdEO0FBRWhEOztHQUVHO0FBQ1UsUUFBQSxTQUFTLEdBQUcsU0FBZSxTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7O1FBQ3ZFLDRDQUE0QztRQUM1QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1RCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxJQUFJLCtCQUFTLENBQUMsa0RBQWtELGFBQWEsR0FBRyxDQUFDLENBQUM7U0FDekY7UUFFRCwrQkFBK0I7UUFDL0IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FBQSxDQUFDO0FBR0Y7O0dBRUc7QUFDVSxRQUFBLFFBQVEsR0FBRyxTQUFlLFFBQVE7O1FBQzdDLGlEQUFpRDtRQUNqRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNsRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxJQUFJLCtCQUFTLENBQUMsd0NBQXdDLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDOUU7UUFFRCwrQkFBK0I7UUFDL0IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBKU09ONSBmcm9tIFwianNvbjVcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbi8qKlxuICogR2V0cyBjb25maWcgZnJvbSBjdXJyZW50IGRpcmVjdG9yeSBwYWNrYWdlLmpzb24gZmlsZVxuICovXG5leHBvcnQgY29uc3QgcGtnQ29uZmlnID0gYXN5bmMgZnVuY3Rpb24gcGtnQ29uZmlnKGJhc2VEaXIgPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIC8vIFRyeSB0byBmaW5kIHBrZyBmaWxlIGluIGN1cnJlbnQgZGlyZWN0b3J5XG4gIGNvbnN0IHBrZ0NvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUoYmFzZURpciwgXCJwYWNrYWdlLmpzb25cIik7XG4gIGNvbnN0IHBrZ0NvbmZpZ1JhdyA9IGZzLnJlYWRGaWxlU3luYyhwa2dDb25maWdQYXRoKTtcblxuICBpZiAoIXBrZ0NvbmZpZ1JhdyB8fCAhcGtnQ29uZmlnUmF3LnRvU3RyaW5nKCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgbG9hZCBQYWNrYWdlIGluZm9ybWF0aW9uIGZpbGUgZnJvbTogXCIke3BrZ0NvbmZpZ1BhdGh9XCJgKTtcbiAgfVxuXG4gIC8vIFRPRE86IEhhbmRsZSBleGNlcHRpb25zIGhlcmVcbiAgcmV0dXJuIEpTT041LnBhcnNlKHBrZ0NvbmZpZ1Jhdy50b1N0cmluZygpKTtcbn07XG5cblxuLyoqXG4gKiBHZXRzIHRzIGNvbmZpZyBmcm9tIGN1cnJlbnQgZGlyZWN0b3J5IHNhZmVseVxuICovXG5leHBvcnQgY29uc3QgdHNDb25maWcgPSBhc3luYyBmdW5jdGlvbiB0c0NvbmZpZygpIHtcbiAgLy8gVHJ5IHRvIGZpbmQgdHNjb25maWcgZmlsZSBpbiBjdXJyZW50IGRpcmVjdG9yeVxuICBjb25zdCB0c0NvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJ0c2NvbmZpZy5qc29uXCIpO1xuICBjb25zdCB0c0NvbmZpZ1JhdyA9IGZzLnJlYWRGaWxlU3luYyh0c0NvbmZpZ1BhdGgpO1xuXG4gIGlmICghdHNDb25maWdSYXcgfHwgIXRzQ29uZmlnUmF3LnRvU3RyaW5nKCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgbG9hZCBUUyBDb25maWcgZmlsZSBmcm9tOiBcIiR7dHNDb25maWdQYXRofVwiYCk7XG4gIH1cblxuICAvLyBUT0RPOiBIYW5kbGUgZXhjZXB0aW9ucyBoZXJlXG4gIHJldHVybiBKU09ONS5wYXJzZSh0c0NvbmZpZ1Jhdy50b1N0cmluZygpKTtcbn07XG4iXX0=