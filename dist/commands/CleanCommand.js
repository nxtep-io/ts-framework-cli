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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xlYW5Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0NsZWFuQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsZ0RBQXlDO0FBQ3pDLG9DQUFvQztBQUVwQyxNQUFxQixZQUFhLFNBQVEscUJBQVc7SUFBckQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1Isb0NBQW9DO1lBQ3BDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLO1NBQ3hCLENBQUM7SUFnQkosQ0FBQztJQWRjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFULE9BQU8sY0FBbEQsY0FBb0QsQ0FBRjs7WUFDakUsa0RBQWtEO1lBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQVEsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRiwyREFBMkQ7WUFDM0QsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7YUFDdEQ7O0tBQ0Y7Q0FDRjtBQXRCRCwrQkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIHJpbXJhZiBmcm9tIFwicmltcmFmXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyB0c0NvbmZpZyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGVhbkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7IFxuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogXCJjbGVhblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNsZWFucyB0aGUgZGlzdHJpYnV0aW9uIGZpbGVzXCIsXG4gICAgaGFuZGxlcjogeWFyZ3MgPT4geWFyZ3NcbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IHRzQ29uZmlnKCk7XG4gICAgY29uc3QgZGlzdHJpYnV0aW9uUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuY29tcGlsZXJPcHRpb25zLm91dERpcik7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgdHJhbnNwaWxlZCBzb3VyY2VzIGRpcmVjdG9yeSBhbHJlYWR5IGV4aXN0c1xuICAgIGlmIChmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvblBhdGgpKSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIkNsZWFuaW5nIGRpc3RyaWJ1dGlvbiBmaWxlcy4uLlwiLCB7IGRpc3RyaWJ1dGlvblBhdGggfSk7XG4gICAgICByaW1yYWYuc3luYyhkaXN0cmlidXRpb25QYXRoKTtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJTdWNjZXNzIVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIk5vIGRpc3RyaWJ1dGlvbiBmaWxlcyB3ZXJlIGZvdW5kXCIpO1xuICAgIH1cbiAgfVxufVxuIl19