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
const BaseCommand_1 = require("../BaseCommand");
class ListenCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "listen [entrypoint]",
            description: "Starts the standalone server",
            builder: yargs => {
                yargs
                    .boolean("d")
                    .alias("d", "development")
                    .describe("d", "Starts server without production flags");
                yargs
                    .string("p")
                    .alias("p", "port")
                    .describe("p", "The PORT to listen to, can be overriden with PORT env variable");
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
            const instance = yield this.load(distributionFile, Object.assign(Object.assign({}, options), { port }));
            yield instance.listen();
        });
    }
}
exports.default = ListenCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9MaXN0ZW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBeUM7QUFFekMsTUFBcUIsYUFBYyxTQUFRLHFCQUFXO0lBQXREOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztxQkFDekIsUUFBUSxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUUzRCxLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZ0VBQWdFLENBQUMsQ0FBQztnQkFFbkYsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQWtCSixDQUFDO0lBaEJjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFULE9BQU8sY0FBbEQsY0FBb0QsQ0FBRjs7WUFDakUsNENBQTRDO1lBQzVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFFL0QsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXRGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsd0NBQXdDO2dCQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7YUFDN0Q7WUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLGtDQUFPLE9BQU8sS0FBRSxJQUFJLElBQUcsQ0FBQztZQUN6RSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7S0FDekI7Q0FDRjtBQXBDRCxnQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnVuQ29tbWFuZCBmcm9tIFwiLi9SdW5Db21tYW5kXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImxpc3RlbiBbZW50cnlwb2ludF1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTdGFydHMgdGhlIHN0YW5kYWxvbmUgc2VydmVyXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJkXCIpXG4gICAgICAgIC5hbGlhcyhcImRcIiwgXCJkZXZlbG9wbWVudFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJkXCIsIFwiU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJwXCIpXG4gICAgICAgIC5hbGlhcyhcInBcIiwgXCJwb3J0XCIpXG4gICAgICAgIC5kZXNjcmliZShcInBcIiwgXCJUaGUgUE9SVCB0byBsaXN0ZW4gdG8sIGNhbiBiZSBvdmVycmlkZW4gd2l0aCBQT1JUIGVudiB2YXJpYWJsZVwiKTtcblxuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIHVubGVzcyBmbGFnIHdhcyBzdXBwbGllZFxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZW52ID0gb3B0aW9ucy5kZXZlbG9wbWVudCA/IFwiZGV2ZWxvcG1lbnRcIiA6IFwicHJvZHVjdGlvblwiO1xuXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMuZ2V0RW50cnlwb2ludCh7IGVudHJ5cG9pbnQsIGVudiB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgc2VydmVyIGluIFwiJHtlbnZ9XCIgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICBpZiAoZW52ICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIC8vIFNldCBwcm9kdWN0aW9uIGVudmlyb25tZW50IGlmIG1pc3NpbmdcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgXCJwcm9kdWN0aW9uXCI7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwgeyAuLi5vcHRpb25zLCBwb3J0IH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLmxpc3RlbigpO1xuICB9XG59XG4iXX0=