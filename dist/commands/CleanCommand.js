"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const rimraf = require("rimraf");
const BaseCommand_1 = require("../BaseCommand");
const utils_1 = require("../utils");
class CleanCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "clean",
            description: "Cleans the distribution files",
            handler: yargs => yargs
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Try to find transpiled directory using tsconfig
            const config = yield utils_1.tsConfig();
            const distributionPath = Path.resolve(process.cwd(), config.compilerOptions.outDir);
            // Check if the transpiled sources directory already exists
            if (fs.existsSync(distributionPath)) {
                this.logger.debug("Cleaning distribution files...", { distributionPath });
                rimraf.sync(distributionPath);
                this.logger.info("Success!");
            }
            else {
                this.logger.info("No distribution files were found");
            }
        });
    }
}
exports.default = CleanCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xlYW5Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0NsZWFuQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsZ0RBQXlDO0FBQ3pDLG9DQUFvQztBQUVwQyxNQUFxQixZQUFhLFNBQVEscUJBQVc7SUFBckQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1Isb0NBQW9DO1lBQ3BDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLO1NBQ3hCLENBQUM7SUFnQkosQ0FBQztJQWRjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNqRSxrREFBa0Q7WUFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBUSxFQUFFLENBQUM7WUFDaEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBGLDJEQUEyRDtZQUMzRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUN0RDs7S0FDRjtDQUNGO0FBdEJELCtCQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgcmltcmFmIGZyb20gXCJyaW1yYWZcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IHRzQ29uZmlnIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsZWFuQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHsgXG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImNsZWFuXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ2xlYW5zIHRoZSBkaXN0cmlidXRpb24gZmlsZXNcIixcbiAgICBoYW5kbGVyOiB5YXJncyA9PiB5YXJnc1xuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZGlyZWN0b3J5IHVzaW5nIHRzY29uZmlnXG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgdHNDb25maWcoKTtcbiAgICBjb25zdCBkaXN0cmlidXRpb25QYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5jb21waWxlck9wdGlvbnMub3V0RGlyKTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSB0cmFuc3BpbGVkIHNvdXJjZXMgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uUGF0aCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiQ2xlYW5pbmcgZGlzdHJpYnV0aW9uIGZpbGVzLi4uXCIsIHsgZGlzdHJpYnV0aW9uUGF0aCB9KTtcbiAgICAgIHJpbXJhZi5zeW5jKGRpc3RyaWJ1dGlvblBhdGgpO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIlN1Y2Nlc3MhXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiTm8gZGlzdHJpYnV0aW9uIGZpbGVzIHdlcmUgZm91bmRcIik7XG4gICAgfVxuICB9XG59XG4iXX0=