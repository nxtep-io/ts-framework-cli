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
class BaseRunCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "run [entrypoint]",
            description: "Runs the server components without lifting express",
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
            const env = options.development ? "development" : options.env || "production";
            // Prepare distribution file
            const distributionFile = yield this.getEntrypoint({ entrypoint, env });
            this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            // Load server constructor from distribution file path
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            // Manually start the server lifecycle without listening to express port
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = BaseRunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJ1bkNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvQmFzZVJ1bkNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF5QztBQUV6QyxNQUFxQixjQUFlLFNBQVEscUJBQVc7SUFBdkQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixXQUFXLEVBQUUsb0RBQW9EO1lBQ2pFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDZixLQUFLO3FCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUM7cUJBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7cUJBQ3pCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztnQkFFM0QsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO3FCQUNsQixRQUFRLENBQUMsR0FBRyxFQUFFLGdFQUFnRSxDQUFDLENBQUM7Z0JBRW5GLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUF1QkosQ0FBQztJQXJCYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsNENBQTRDO1lBQzVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQztZQUU5RSw0QkFBNEI7WUFDNUIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXZGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCxzREFBc0Q7WUFDdEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFFekUsd0VBQXdFO1lBQ3hFLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOztLQUMxQjtDQUNGO0FBeENELGlDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVJ1bkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcInJ1biBbZW50cnlwb2ludF1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSdW5zIHRoZSBzZXJ2ZXIgY29tcG9uZW50cyB3aXRob3V0IGxpZnRpbmcgZXhwcmVzc1wiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwiZFwiKVxuICAgICAgICAuYWxpYXMoXCJkXCIsIFwiZGV2ZWxvcG1lbnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZFwiLCBcIlN0YXJ0cyBzZXJ2ZXIgd2l0aG91dCBwcm9kdWN0aW9uIGZsYWdzXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwicFwiKVxuICAgICAgICAuYWxpYXMoXCJwXCIsIFwicG9ydFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJwXCIsIFwiVGhlIFBPUlQgdG8gbGlzdGVuIHRvLCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggUE9SVCBlbnYgdmFyaWFibGVcIik7XG5cbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgcHJvZHVjdGlvbiB1bmxlc3MgZmxhZyB3YXMgc3VwcGxpZWRcbiAgICBjb25zdCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGVudiA9IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyBcImRldmVsb3BtZW50XCIgOiBvcHRpb25zLmVudiB8fCBcInByb2R1Y3Rpb25cIjtcblxuICAgIC8vIFByZXBhcmUgZGlzdHJpYnV0aW9uIGZpbGVcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyB3b3JrZXJzIGluIFwiJHtlbnZ9XCIgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICBpZiAoZW52ICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gXCJwcm9kdWN0aW9uXCI7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBzZXJ2ZXIgY29uc3RydWN0b3IgZnJvbSBkaXN0cmlidXRpb24gZmlsZSBwYXRoXG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwgeyAuLi5vcHRpb25zLCBwb3J0IH0pO1xuXG4gICAgLy8gTWFudWFsbHkgc3RhcnQgdGhlIHNlcnZlciBsaWZlY3ljbGUgd2l0aG91dCBsaXN0ZW5pbmcgdG8gZXhwcmVzcyBwb3J0XG4gICAgYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuICB9XG59XG4iXX0=