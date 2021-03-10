"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsConfig = exports.pkgConfig = void 0;
const fs = require("fs");
const Path = require("path");
const JSON5 = require("json5");
const ts_framework_common_1 = require("ts-framework-common");
/**
 * Gets config from current directory package.json file
 */
const pkgConfig = function pkgConfig(baseDir = process.cwd()) {
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
exports.pkgConfig = pkgConfig;
/**
 * Gets ts config from current directory safely
 */
const tsConfig = function tsConfig() {
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
exports.tsConfig = tsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZXNjcmlwdFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWxzL1R5cGVzY3JpcHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiw2REFBZ0Q7QUFFaEQ7O0dBRUc7QUFDSSxNQUFNLFNBQVMsR0FBRyxTQUFlLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTs7UUFDdkUsNENBQTRDO1FBQzVDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QyxNQUFNLElBQUksK0JBQVMsQ0FBQyxrREFBa0QsYUFBYSxHQUFHLENBQUMsQ0FBQztTQUN6RjtRQUVELCtCQUErQjtRQUMvQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUFBLENBQUM7QUFYVyxRQUFBLFNBQVMsYUFXcEI7QUFHRjs7R0FFRztBQUNJLE1BQU0sUUFBUSxHQUFHLFNBQWUsUUFBUTs7UUFDN0MsaURBQWlEO1FBQ2pELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksK0JBQVMsQ0FBQyx3Q0FBd0MsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUM5RTtRQUVELCtCQUErQjtRQUMvQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUFBLENBQUM7QUFYVyxRQUFBLFFBQVEsWUFXbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIEpTT041IGZyb20gXCJqc29uNVwiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcblxuLyoqXG4gKiBHZXRzIGNvbmZpZyBmcm9tIGN1cnJlbnQgZGlyZWN0b3J5IHBhY2thZ2UuanNvbiBmaWxlXG4gKi9cbmV4cG9ydCBjb25zdCBwa2dDb25maWcgPSBhc3luYyBmdW5jdGlvbiBwa2dDb25maWcoYmFzZURpciA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgLy8gVHJ5IHRvIGZpbmQgcGtnIGZpbGUgaW4gY3VycmVudCBkaXJlY3RvcnlcbiAgY29uc3QgcGtnQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShiYXNlRGlyLCBcInBhY2thZ2UuanNvblwiKTtcbiAgY29uc3QgcGtnQ29uZmlnUmF3ID0gZnMucmVhZEZpbGVTeW5jKHBrZ0NvbmZpZ1BhdGgpO1xuXG4gIGlmICghcGtnQ29uZmlnUmF3IHx8ICFwa2dDb25maWdSYXcudG9TdHJpbmcoKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENvdWxkIG5vdCBsb2FkIFBhY2thZ2UgaW5mb3JtYXRpb24gZmlsZSBmcm9tOiBcIiR7cGtnQ29uZmlnUGF0aH1cImApO1xuICB9XG5cbiAgLy8gVE9ETzogSGFuZGxlIGV4Y2VwdGlvbnMgaGVyZVxuICByZXR1cm4gSlNPTjUucGFyc2UocGtnQ29uZmlnUmF3LnRvU3RyaW5nKCkpO1xufTtcblxuXG4vKipcbiAqIEdldHMgdHMgY29uZmlnIGZyb20gY3VycmVudCBkaXJlY3Rvcnkgc2FmZWx5XG4gKi9cbmV4cG9ydCBjb25zdCB0c0NvbmZpZyA9IGFzeW5jIGZ1bmN0aW9uIHRzQ29uZmlnKCkge1xuICAvLyBUcnkgdG8gZmluZCB0c2NvbmZpZyBmaWxlIGluIGN1cnJlbnQgZGlyZWN0b3J5XG4gIGNvbnN0IHRzQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInRzY29uZmlnLmpzb25cIik7XG4gIGNvbnN0IHRzQ29uZmlnUmF3ID0gZnMucmVhZEZpbGVTeW5jKHRzQ29uZmlnUGF0aCk7XG5cbiAgaWYgKCF0c0NvbmZpZ1JhdyB8fCAhdHNDb25maWdSYXcudG9TdHJpbmcoKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENvdWxkIG5vdCBsb2FkIFRTIENvbmZpZyBmaWxlIGZyb206IFwiJHt0c0NvbmZpZ1BhdGh9XCJgKTtcbiAgfVxuXG4gIC8vIFRPRE86IEhhbmRsZSBleGNlcHRpb25zIGhlcmVcbiAgcmV0dXJuIEpTT041LnBhcnNlKHRzQ29uZmlnUmF3LnRvU3RyaW5nKCkpO1xufTtcbiJdfQ==