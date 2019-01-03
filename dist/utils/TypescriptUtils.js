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
exports.pkgConfig = function tsConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        // Try to find pkg file in current directory
        const pkgConfigPath = Path.resolve(process.cwd(), "package.json");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZXNjcmlwdFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWxzL1R5cGVzY3JpcHRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsNkRBQWdEO0FBRWhEOztHQUVHO0FBQ1UsUUFBQSxTQUFTLEdBQUcsU0FBZSxRQUFROztRQUM5Qyw0Q0FBNEM7UUFDNUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbEUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzdDLE1BQU0sSUFBSSwrQkFBUyxDQUFDLGtEQUFrRCxhQUFhLEdBQUcsQ0FBQyxDQUFDO1NBQ3pGO1FBRUQsK0JBQStCO1FBQy9CLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQUEsQ0FBQztBQUdGOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsU0FBZSxRQUFROztRQUM3QyxpREFBaUQ7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDbEUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNDLE1BQU0sSUFBSSwrQkFBUyxDQUFDLHdDQUF3QyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsK0JBQStCO1FBQy9CLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgSlNPTjUgZnJvbSBcImpzb241XCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuXG4vKipcbiAqIEdldHMgY29uZmlnIGZyb20gY3VycmVudCBkaXJlY3RvcnkgcGFja2FnZS5qc29uIGZpbGVcbiAqL1xuZXhwb3J0IGNvbnN0IHBrZ0NvbmZpZyA9IGFzeW5jIGZ1bmN0aW9uIHRzQ29uZmlnKCkge1xuICAvLyBUcnkgdG8gZmluZCBwa2cgZmlsZSBpbiBjdXJyZW50IGRpcmVjdG9yeVxuICBjb25zdCBwa2dDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwicGFja2FnZS5qc29uXCIpO1xuICBjb25zdCBwa2dDb25maWdSYXcgPSBmcy5yZWFkRmlsZVN5bmMocGtnQ29uZmlnUGF0aCk7XG5cbiAgaWYgKCFwa2dDb25maWdSYXcgfHwgIXBrZ0NvbmZpZ1Jhdy50b1N0cmluZygpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGxvYWQgUGFja2FnZSBpbmZvcm1hdGlvbiBmaWxlIGZyb206IFwiJHtwa2dDb25maWdQYXRofVwiYCk7XG4gIH1cblxuICAvLyBUT0RPOiBIYW5kbGUgZXhjZXB0aW9ucyBoZXJlXG4gIHJldHVybiBKU09ONS5wYXJzZShwa2dDb25maWdSYXcudG9TdHJpbmcoKSk7XG59O1xuXG5cbi8qKlxuICogR2V0cyB0cyBjb25maWcgZnJvbSBjdXJyZW50IGRpcmVjdG9yeSBzYWZlbHlcbiAqL1xuZXhwb3J0IGNvbnN0IHRzQ29uZmlnID0gYXN5bmMgZnVuY3Rpb24gdHNDb25maWcoKSB7XG4gIC8vIFRyeSB0byBmaW5kIHRzY29uZmlnIGZpbGUgaW4gY3VycmVudCBkaXJlY3RvcnlcbiAgY29uc3QgdHNDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwidHNjb25maWcuanNvblwiKTtcbiAgY29uc3QgdHNDb25maWdSYXcgPSBmcy5yZWFkRmlsZVN5bmModHNDb25maWdQYXRoKTtcblxuICBpZiAoIXRzQ29uZmlnUmF3IHx8ICF0c0NvbmZpZ1Jhdy50b1N0cmluZygpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGxvYWQgVFMgQ29uZmlnIGZpbGUgZnJvbTogXCIke3RzQ29uZmlnUGF0aH1cImApO1xuICB9XG5cbiAgLy8gVE9ETzogSGFuZGxlIGV4Y2VwdGlvbnMgaGVyZVxuICByZXR1cm4gSlNPTjUucGFyc2UodHNDb25maWdSYXcudG9TdHJpbmcoKSk7XG59O1xuIl19