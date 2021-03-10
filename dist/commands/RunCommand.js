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
                // Set production environment if missing
                process.env.NODE_ENV = process.env.NODE_ENV || "production";
            }
            // Load server constructor from distribution file path
            const instance = yield this.load(distributionFile, Object.assign(Object.assign({}, options), { port }));
            // Manually start the server lifecycle without listening to express port
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = BaseRunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBeUM7QUFFekMsTUFBcUIsY0FBZSxTQUFRLHFCQUFXO0lBQXZEOztRQUNFLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsV0FBVyxFQUFFLG9EQUFvRDtZQUNqRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDO3FCQUN6QixRQUFRLENBQUMsR0FBRyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7Z0JBRTNELEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxnRUFBZ0UsQ0FBQyxDQUFDO2dCQUVuRixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDO0lBdUJKLENBQUM7SUFyQmMsR0FBRyxDQUFDLEVBQW9EO1lBQXBELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFjLEVBQVQsT0FBTyxjQUFsRCxjQUFvRCxDQUFGOztZQUNqRSw0Q0FBNEM7WUFDNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMvQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDO1lBRTlFLDRCQUE0QjtZQUM1QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFdkYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6Qix3Q0FBd0M7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQzthQUM3RDtZQUVELHNEQUFzRDtZQUN0RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLGtDQUFPLE9BQU8sS0FBRSxJQUFJLElBQUcsQ0FBQztZQUV6RSx3RUFBd0U7WUFDeEUsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7O0tBQzFCO0NBQ0Y7QUF4Q0QsaUNBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUnVuQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwicnVuIFtlbnRyeXBvaW50XVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJ1bnMgdGhlIHNlcnZlciBjb21wb25lbnRzIHdpdGhvdXQgbGlmdGluZyBleHByZXNzXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJkXCIpXG4gICAgICAgIC5hbGlhcyhcImRcIiwgXCJkZXZlbG9wbWVudFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJkXCIsIFwiU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJwXCIpXG4gICAgICAgIC5hbGlhcyhcInBcIiwgXCJwb3J0XCIpXG4gICAgICAgIC5kZXNjcmliZShcInBcIiwgXCJUaGUgUE9SVCB0byBsaXN0ZW4gdG8sIGNhbiBiZSBvdmVycmlkZW4gd2l0aCBQT1JUIGVudiB2YXJpYWJsZVwiKTtcblxuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIHVubGVzcyBmbGFnIHdhcyBzdXBwbGllZFxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZW52ID0gb3B0aW9ucy5kZXZlbG9wbWVudCA/IFwiZGV2ZWxvcG1lbnRcIiA6IG9wdGlvbnMuZW52IHx8IFwicHJvZHVjdGlvblwiO1xuXG4gICAgLy8gUHJlcGFyZSBkaXN0cmlidXRpb24gZmlsZVxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLmdldEVudHJ5cG9pbnQoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHdvcmtlcnMgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gU2V0IHByb2R1Y3Rpb24gZW52aXJvbm1lbnQgaWYgbWlzc2luZ1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICAvLyBMb2FkIHNlcnZlciBjb25zdHJ1Y3RvciBmcm9tIGRpc3RyaWJ1dGlvbiBmaWxlIHBhdGhcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG5cbiAgICAvLyBNYW51YWxseSBzdGFydCB0aGUgc2VydmVyIGxpZmVjeWNsZSB3aXRob3V0IGxpc3RlbmluZyB0byBleHByZXNzIHBvcnRcbiAgICBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG4gIH1cbn1cbiJdfQ==