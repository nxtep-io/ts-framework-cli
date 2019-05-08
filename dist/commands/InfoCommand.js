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
                // Set production environment if missing
                process.env.NODE_ENV = process.env.NODE_ENV || "production";
            }
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            // Prepare ts-framework info
            const pkg = yield utils_1.pkgConfig();
            const tsFramework = pkg.dependencies['ts-framework'];
            // Complete log for verbose purposes
            this.logger.info(
            // tslint:disable-next-line:prefer-template
            "\n--------------------------------------------------------------------------------\n" +
                "                                                                                  \n" +
                "        ts-framework                                                              \n" +
                "        ============                                                              \n" +
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mb0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvSW5mb0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUF5QztBQUN6QyxvQ0FBbUQ7QUFFbkQsTUFBcUIsV0FBWSxTQUFRLHFCQUFXO0lBQXBEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLFdBQVcsRUFBRSxzQ0FBc0M7WUFDbkQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztxQkFDekIsUUFBUSxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUUzRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDO0lBc0NKLENBQUM7SUFwQ2MsR0FBRyxDQUFDLEVBQW9EO1lBQXBELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFjLEVBQVosb0NBQVU7O1lBQ2pFLDRDQUE0QztZQUM1QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBRS9ELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsc0JBQXNCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUV0RixJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7Z0JBQ3pCLHdDQUF3QztnQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDO2FBQzdEO1lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFFekUsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxHQUFHLE1BQU0saUJBQVMsRUFBRSxDQUFDO1lBQzlCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFckQsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNkLDJDQUEyQztZQUMzQyxzRkFBc0Y7Z0JBQ3RGLHNGQUFzRjtnQkFDdEYsc0ZBQXNGO2dCQUN0RixzRkFBc0Y7Z0JBQ3RGLHNGQUFzRjtnQkFDdEYsZ0NBQWdDLFdBQVcsMkNBQTJDO2dCQUN0RixzRkFBc0Y7Z0JBQ3RGLGdDQUFnQyxHQUFHLENBQUMsSUFBSSw4Q0FBOEM7Z0JBQ3RGLGdDQUFnQyxHQUFHLENBQUMsT0FBTywyQ0FBMkM7Z0JBQ3RGLGdDQUFnQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksaUNBQWlDO2dCQUN0RixzRkFBc0Y7Z0JBQ3RGLHNGQUFzRixDQUN2RixDQUFDOztLQUNIO0NBQ0Y7QUFuREQsOEJBbURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bkNvbW1hbmQgZnJvbSBcIi4vUnVuQ29tbWFuZFwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgcGtnQ29uZmlnLCBnZXREYXRhYmFzZXMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mb0NvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImluZm8gW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2V0cyBpbmZvcm1hdGlvbiBmcm9tIGN1cnJlbnQgc2VydmVyXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJkXCIpXG4gICAgICAgIC5hbGlhcyhcImRcIiwgXCJkZXZlbG9wbWVudFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJkXCIsIFwiU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIik7XG5cbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgcHJvZHVjdGlvbiB1bmxlc3MgZmxhZyB3YXMgc3VwcGxpZWRcbiAgICBjb25zdCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGVudiA9IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyBcImRldmVsb3BtZW50XCIgOiBcInByb2R1Y3Rpb25cIjtcblxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLmdldEVudHJ5cG9pbnQoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHNlcnZlciBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBTZXQgcHJvZHVjdGlvbiBlbnZpcm9ubWVudCBpZiBtaXNzaW5nXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcblxuICAgIC8vIFByZXBhcmUgdHMtZnJhbWV3b3JrIGluZm9cbiAgICBjb25zdCBwa2cgPSBhd2FpdCBwa2dDb25maWcoKTtcbiAgICBjb25zdCB0c0ZyYW1ld29yayA9IHBrZy5kZXBlbmRlbmNpZXNbJ3RzLWZyYW1ld29yayddO1xuXG4gICAgLy8gQ29tcGxldGUgbG9nIGZvciB2ZXJib3NlIHB1cnBvc2VzXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItdGVtcGxhdGVcbiAgICAgIFwiXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIiArXG4gICAgICBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cIiArXG4gICAgICBcIiAgICAgICAgdHMtZnJhbWV3b3JrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cIiArXG4gICAgICBcIiAgICAgICAgPT09PT09PT09PT09ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cIiArXG4gICAgICBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cIiArXG4gICAgICBgICAgICAgICBGcmFtZXdvcmsgdmVyc2lvbjogICAke3RzRnJhbWV3b3JrfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbmAgK1xuICAgICAgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgYCAgICAgICAgQXBwIG5hbWU6ICAgICAgICAgICAgJHtwa2cubmFtZX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5gICtcbiAgICAgIGAgICAgICAgIEFwcCB2ZXJzaW9uOiAgICAgICAgICR7cGtnLnZlcnNpb259ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuYCArXG4gICAgICBgICAgICAgICBBcHAgcG9ydDogICAgICAgICAgICAke2luc3RhbmNlLm9wdGlvbnMucG9ydH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbmAgK1xuICAgICAgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgXCJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiIFxuICAgICk7XG4gIH1cbn1cbiJdfQ==