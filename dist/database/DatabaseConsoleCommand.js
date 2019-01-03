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
const ts_framework_common_1 = require("ts-framework-common");
const BaseCommand_1 = require("../BaseCommand");
const utils_1 = require("../utils");
class DatabaseCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "db:query <query>",
            description: "Runs database query using Server entrypoint",
            builder: yargs => {
                // yargs
                //   .boolean("e") 
                //   .alias("e", "entrypoint")
                //   .describe("d", "Starts server without production flags");
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
            this.logger.debug(`Starting database in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            // Manually start the server lifecycle without listening to express port
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            yield instance.onInit();
            yield instance.onReady();
            // Find database instance    
            const dbs = yield utils_1.getDatabases(instance);
            if (!dbs || !dbs.length) {
                throw new ts_framework_common_1.BaseError(
                // tslint:disable-next-line:max-line-length
                'Could not find any database registered in the supplied server instance, make sure it\'s registered as a child component');
            }
            // TODO: Support multiple databases
            const db = dbs[0];
            if (!db || !db.query) {
                throw new ts_framework_common_1.BaseError('The database has an unknown interface, make sure it\'s a TS Framework module and that it\'s updated');
            }
            this.logger.info('Running database query', { database: db.options.name, query: options.query });
            this.logger.info('Database query result', { result: yield db.query(options.query) });
            return;
        });
    }
}
exports.default = DatabaseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VDb25zb2xlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZUNvbnNvbGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixlQUFnQixTQUFRLHFCQUFVO0lBQXZEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLFFBQVE7Z0JBQ1IsbUJBQW1CO2dCQUNuQiw4QkFBOEI7Z0JBQzlCLDhEQUE4RDtnQkFDOUQsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQTJDSixDQUFDO0lBekNjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNqRSw0Q0FBNEM7WUFDNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMvQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUUvRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFeEYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELHdFQUF3RTtZQUN4RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUFPLE9BQU8sSUFBRSxJQUFJLElBQUcsQ0FBQztZQUN6RSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV6Qiw2QkFBNkI7WUFDN0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLElBQUksK0JBQVM7Z0JBQ2pCLDJDQUEyQztnQkFDM0MseUhBQXlILENBQzFILENBQUM7YUFDSDtZQUVELG1DQUFtQztZQUNuQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3BCLE1BQU0sSUFBSSwrQkFBUyxDQUNqQixxR0FBcUcsQ0FDdEcsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLE9BQU87O0tBQ1I7Q0FDRjtBQXZERCxrQ0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFJ1bkNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBnZXREYXRhYmFzZXMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2VDb21tYW5kIGV4dGVuZHMgUnVuQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImRiOnF1ZXJ5IDxxdWVyeT5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSdW5zIGRhdGFiYXNlIHF1ZXJ5IHVzaW5nIFNlcnZlciBlbnRyeXBvaW50XCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgLy8geWFyZ3NcbiAgICAgIC8vICAgLmJvb2xlYW4oXCJlXCIpIFxuICAgICAgLy8gICAuYWxpYXMoXCJlXCIsIFwiZW50cnlwb2ludFwiKVxuICAgICAgLy8gICAuZGVzY3JpYmUoXCJkXCIsIFwiU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIik7XG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gdW5sZXNzIGZsYWcgd2FzIHN1cHBsaWVkXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBlbnYgPSBvcHRpb25zLmRldmVsb3BtZW50ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCI7XG5cbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBkYXRhYmFzZSBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIC8vIE1hbnVhbGx5IHN0YXJ0IHRoZSBzZXJ2ZXIgbGlmZWN5Y2xlIHdpdGhvdXQgbGlzdGVuaW5nIHRvIGV4cHJlc3MgcG9ydFxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG5cbiAgICAvLyBGaW5kIGRhdGFiYXNlIGluc3RhbmNlICAgIFxuICAgIGNvbnN0IGRicyA9IGF3YWl0IGdldERhdGFiYXNlcyhpbnN0YW5jZSk7XG5cbiAgICBpZiAoIWRicyB8fCAhZGJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgYW55IGRhdGFiYXNlIHJlZ2lzdGVyZWQgaW4gdGhlIHN1cHBsaWVkIHNlcnZlciBpbnN0YW5jZSwgbWFrZSBzdXJlIGl0XFwncyByZWdpc3RlcmVkIGFzIGEgY2hpbGQgY29tcG9uZW50JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBtdWx0aXBsZSBkYXRhYmFzZXNcbiAgICBjb25zdCBkYiA9IGRic1swXTtcblxuICAgIGlmICghZGIgfHwgIWRiLnF1ZXJ5KSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAnVGhlIGRhdGFiYXNlIGhhcyBhbiB1bmtub3duIGludGVyZmFjZSwgbWFrZSBzdXJlIGl0XFwncyBhIFRTIEZyYW1ld29yayBtb2R1bGUgYW5kIHRoYXQgaXRcXCdzIHVwZGF0ZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oJ1J1bm5pbmcgZGF0YWJhc2UgcXVlcnknLCB7IGRhdGFiYXNlOiBkYi5vcHRpb25zLm5hbWUsIHF1ZXJ5OiBvcHRpb25zLnF1ZXJ5IH0pO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ0RhdGFiYXNlIHF1ZXJ5IHJlc3VsdCcsIHsgcmVzdWx0OiBhd2FpdCBkYi5xdWVyeShvcHRpb25zLnF1ZXJ5KSB9KTtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==