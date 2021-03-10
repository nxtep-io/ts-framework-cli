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
const ts_framework_common_1 = require("ts-framework-common");
const BaseCommand_1 = require("../BaseCommand");
const utils_1 = require("../utils");
class DatabaseDropCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "db:drop",
            description: "Drops database schema",
            builder: yargs => {
                yargs
                    .boolean("e")
                    .alias("e", "entrypoint")
                    .describe("e", "Sets server entrypoint for looking for databases");
                return yargs;
            }
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Force development mode for TS support using TS Node
            const port = options.port || this.options.port;
            const distributionFile = yield this.getEntrypoint({ entrypoint, env: 'development' });
            this.logger.debug(`Starting database in development environment from ${distributionFile}`);
            // Manually start the server lifecycle without listening to express port
            const instance = yield this.load(distributionFile, Object.assign(Object.assign({}, options), { port }));
            // Find database instance    
            const dbs = yield utils_1.getDatabases(instance);
            if (!dbs || !dbs.length) {
                throw new ts_framework_common_1.BaseError(
                // tslint:disable-next-line:max-line-length
                'Could not find any database registered in the supplied server instance, make sure it\'s registered as a child component');
            }
            // TODO: Support multiple databases
            const db = dbs[0];
            if (!db || !db.drop) {
                throw new ts_framework_common_1.BaseError('The database has an unknown interface, make sure it\'s a TS Framework module and that it\'s updated');
            }
            yield db.connect();
            this.logger.info('Dropping database schema', { database: db.options.name });
            yield db.drop();
            this.logger.info('Success');
            yield instance.close();
            return;
        });
    }
}
exports.default = DatabaseDropCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VEcm9wQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZURyb3BDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixtQkFBb0IsU0FBUSxxQkFBVTtJQUEzRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixvQ0FBb0M7WUFDcEMsTUFBTSxFQUFFLFNBQVM7WUFDakIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO3FCQUN4QixRQUFRLENBQUMsR0FBRyxFQUFFLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ3JFLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUFxQ0osQ0FBQztJQW5DYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBVCxPQUFPLGNBQWxELGNBQW9ELENBQUY7O1lBQ2pFLHNEQUFzRDtZQUN0RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFM0Ysd0VBQXdFO1lBQ3hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Isa0NBQU8sT0FBTyxLQUFFLElBQUksSUFBRyxDQUFDO1lBRXpFLDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSwrQkFBUztnQkFDakIsMkNBQTJDO2dCQUMzQyx5SEFBeUgsQ0FDMUgsQ0FBQzthQUNIO1lBRUQsbUNBQW1DO1lBQ25DLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDbkIsTUFBTSxJQUFJLCtCQUFTLENBQ2pCLHFHQUFxRyxDQUN0RyxDQUFDO2FBQ0g7WUFFRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsT0FBTzs7S0FDUjtDQUNGO0FBakRELHNDQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgUnVuQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IGdldERhdGFiYXNlcyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZURyb3BDb21tYW5kIGV4dGVuZHMgUnVuQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImRiOmRyb3BcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEcm9wcyBkYXRhYmFzZSBzY2hlbWFcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuYm9vbGVhbihcImVcIikgXG4gICAgICAgIC5hbGlhcyhcImVcIiwgXCJlbnRyeXBvaW50XCIpXG4gICAgICAgIC5kZXNjcmliZShcImVcIiwgXCJTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBsb29raW5nIGZvciBkYXRhYmFzZXNcIik7XG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIGRldmVsb3BtZW50IG1vZGUgZm9yIFRTIHN1cHBvcnQgdXNpbmcgVFMgTm9kZVxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMuZ2V0RW50cnlwb2ludCh7IGVudHJ5cG9pbnQsIGVudjogJ2RldmVsb3BtZW50JyB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgZGF0YWJhc2UgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICAvLyBNYW51YWxseSBzdGFydCB0aGUgc2VydmVyIGxpZmVjeWNsZSB3aXRob3V0IGxpc3RlbmluZyB0byBleHByZXNzIHBvcnRcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG5cbiAgICAvLyBGaW5kIGRhdGFiYXNlIGluc3RhbmNlICAgIFxuICAgIGNvbnN0IGRicyA9IGF3YWl0IGdldERhdGFiYXNlcyhpbnN0YW5jZSk7XG5cbiAgICBpZiAoIWRicyB8fCAhZGJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgYW55IGRhdGFiYXNlIHJlZ2lzdGVyZWQgaW4gdGhlIHN1cHBsaWVkIHNlcnZlciBpbnN0YW5jZSwgbWFrZSBzdXJlIGl0XFwncyByZWdpc3RlcmVkIGFzIGEgY2hpbGQgY29tcG9uZW50JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBtdWx0aXBsZSBkYXRhYmFzZXNcbiAgICBjb25zdCBkYiA9IGRic1swXTtcblxuICAgIGlmICghZGIgfHwgIWRiLmRyb3ApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXG4gICAgICAgICdUaGUgZGF0YWJhc2UgaGFzIGFuIHVua25vd24gaW50ZXJmYWNlLCBtYWtlIHN1cmUgaXRcXCdzIGEgVFMgRnJhbWV3b3JrIG1vZHVsZSBhbmQgdGhhdCBpdFxcJ3MgdXBkYXRlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXdhaXQgZGIuY29ubmVjdCgpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ0Ryb3BwaW5nIGRhdGFiYXNlIHNjaGVtYScsIHsgZGF0YWJhc2U6IGRiLm9wdGlvbnMubmFtZSB9KTtcbiAgICBhd2FpdCBkYi5kcm9wKCk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnU3VjY2VzcycpO1xuICAgIGF3YWl0IGluc3RhbmNlLmNsb3NlKCk7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=