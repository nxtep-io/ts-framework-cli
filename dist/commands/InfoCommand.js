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
const BaseCommand_1 = require("../BaseCommand");
const utils_1 = require("../utils");
class InfoCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "info [entrypoint]",
            description: "Gets information from current server",
            builder: yargs => {
                yargs
                    .boolean("d")
                    .alias("d", "development")
                    .describe("d", "Starts server without production flags");
                return yargs;
            }
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Force production unless flag was supplied
            const port = options.port || this.options.port;
            const env = options.development ? "development" : "production";
            const distributionFile = yield this.getEntrypoint({ entrypoint, env });
            this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            // Manually start the server lifecycle without listening to express port
            // await instance.onInit();
            // await instance.onReady();
            // Prepare ts-framework info
            const pkg = yield utils_1.pkgConfig();
            const tsFramework = pkg.dependencies['ts-framework'];
            // Complete log for verbose purposes
            this.logger.info(
            // tslint:disable-next-line:prefer-template
            "\n--------------------------------------------------------------------------------\n" +
                "                                                                                  \n" +
                "        ts-framework                                                              \n" +
                "                                                                                  \n" +
                `        Framework version:   ${tsFramework}                                       \n` +
                "                                                                                  \n" +
                `        App name:            ${pkg.name}                                          \n` +
                `        App version:         ${pkg.version}                                       \n` +
                `        App port:            ${instance.options.port}                             \n` +
                "                                                                                  \n" +
                "\n--------------------------------------------------------------------------------\n");
        });
    }
}
exports.default = InfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mb0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvSW5mb0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUF5QztBQUN6QyxvQ0FBbUQ7QUFFbkQsTUFBcUIsV0FBWSxTQUFRLHFCQUFXO0lBQXBEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLFdBQVcsRUFBRSxzQ0FBc0M7WUFDbkQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztxQkFDekIsUUFBUSxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUUzRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDO0lBeUNKLENBQUM7SUF2Q2MsR0FBRyxDQUFDLEVBQW9EO1lBQXBELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFjLEVBQVosb0NBQVU7O1lBQ2pFLDRDQUE0QztZQUM1QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBRS9ELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsc0JBQXNCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUV0RixJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7Z0JBQ3pCLCtCQUErQjtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFFekUsd0VBQXdFO1lBQ3hFLDJCQUEyQjtZQUMzQiw0QkFBNEI7WUFFNUIsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxHQUFHLE1BQU0saUJBQVMsRUFBRSxDQUFDO1lBQzlCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFckQsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNkLDJDQUEyQztZQUMzQyxzRkFBc0Y7Z0JBQ3RGLHNGQUFzRjtnQkFDdEYsc0ZBQXNGO2dCQUN0RixzRkFBc0Y7Z0JBQ3RGLGdDQUFnQyxXQUFXLDJDQUEyQztnQkFDdEYsc0ZBQXNGO2dCQUN0RixnQ0FBZ0MsR0FBRyxDQUFDLElBQUksOENBQThDO2dCQUN0RixnQ0FBZ0MsR0FBRyxDQUFDLE9BQU8sMkNBQTJDO2dCQUN0RixnQ0FBZ0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGlDQUFpQztnQkFDdEYsc0ZBQXNGO2dCQUN0RixzRkFBc0YsQ0FDdkYsQ0FBQzs7S0FDSDtDQUNGO0FBdERELDhCQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdW5Db21tYW5kIGZyb20gXCIuL1J1bkNvbW1hbmRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IHBrZ0NvbmZpZywgZ2V0RGF0YWJhc2VzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZm9Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogXCJpbmZvIFtlbnRyeXBvaW50XVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdldHMgaW5mb3JtYXRpb24gZnJvbSBjdXJyZW50IHNlcnZlclwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwiZFwiKVxuICAgICAgICAuYWxpYXMoXCJkXCIsIFwiZGV2ZWxvcG1lbnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZFwiLCBcIlN0YXJ0cyBzZXJ2ZXIgd2l0aG91dCBwcm9kdWN0aW9uIGZsYWdzXCIpO1xuXG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gdW5sZXNzIGZsYWcgd2FzIHN1cHBsaWVkXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBlbnYgPSBvcHRpb25zLmRldmVsb3BtZW50ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCI7XG5cbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBzZXJ2ZXIgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG5cbiAgICAvLyBNYW51YWxseSBzdGFydCB0aGUgc2VydmVyIGxpZmVjeWNsZSB3aXRob3V0IGxpc3RlbmluZyB0byBleHByZXNzIHBvcnRcbiAgICAvLyBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICAvLyBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG5cbiAgICAvLyBQcmVwYXJlIHRzLWZyYW1ld29yayBpbmZvXG4gICAgY29uc3QgcGtnID0gYXdhaXQgcGtnQ29uZmlnKCk7XG4gICAgY29uc3QgdHNGcmFtZXdvcmsgPSBwa2cuZGVwZW5kZW5jaWVzWyd0cy1mcmFtZXdvcmsnXTtcblxuICAgIC8vIENvbXBsZXRlIGxvZyBmb3IgdmVyYm9zZSBwdXJwb3Nlc1xuICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLXRlbXBsYXRlXG4gICAgICBcIlxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXCIgK1xuICAgICAgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgXCIgICAgICAgIHRzLWZyYW1ld29yayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgYCAgICAgICAgRnJhbWV3b3JrIHZlcnNpb246ICAgJHt0c0ZyYW1ld29ya30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5gICtcbiAgICAgIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblwiICtcbiAgICAgIGAgICAgICAgIEFwcCBuYW1lOiAgICAgICAgICAgICR7cGtnLm5hbWV9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuYCArXG4gICAgICBgICAgICAgICBBcHAgdmVyc2lvbjogICAgICAgICAke3BrZy52ZXJzaW9ufSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbmAgK1xuICAgICAgYCAgICAgICAgQXBwIHBvcnQ6ICAgICAgICAgICAgJHtpbnN0YW5jZS5vcHRpb25zLnBvcnR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5gICtcbiAgICAgIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblwiICtcbiAgICAgIFwiXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIiBcbiAgICApO1xuICB9XG59XG4iXX0=