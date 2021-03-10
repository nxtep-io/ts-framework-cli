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
class DatabaseCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "db:query <query>",
            description: "Runs database query using Server entrypoint",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VDb25zb2xlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZUNvbnNvbGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixlQUFnQixTQUFRLHFCQUFVO0lBQXZEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQztxQkFDeEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxrREFBa0QsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDO0lBb0NKLENBQUM7SUFsQ2MsR0FBRyxDQUFDLEVBQW9EO1lBQXBELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFjLEVBQVQsT0FBTyxjQUFsRCxjQUFvRCxDQUFGOztZQUNqRSxzREFBc0Q7WUFDdEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMvQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRTNGLHdFQUF3RTtZQUN4RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLGtDQUFPLE9BQU8sS0FBRSxJQUFJLElBQUcsQ0FBQztZQUN6RSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV6Qiw2QkFBNkI7WUFDN0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLElBQUksK0JBQVM7Z0JBQ2pCLDJDQUEyQztnQkFDM0MseUhBQXlILENBQzFILENBQUM7YUFDSDtZQUVELG1DQUFtQztZQUNuQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3BCLE1BQU0sSUFBSSwrQkFBUyxDQUNqQixxR0FBcUcsQ0FDdEcsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLE9BQU87O0tBQ1I7Q0FDRjtBQWhERCxrQ0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFJ1bkNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBnZXREYXRhYmFzZXMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2VDb21tYW5kIGV4dGVuZHMgUnVuQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImRiOnF1ZXJ5IDxxdWVyeT5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSdW5zIGRhdGFiYXNlIHF1ZXJ5IHVzaW5nIFNlcnZlciBlbnRyeXBvaW50XCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJlXCIpXG4gICAgICAgIC5hbGlhcyhcImVcIiwgXCJlbnRyeXBvaW50XCIpXG4gICAgICAgIC5kZXNjcmliZShcImVcIiwgXCJTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBsb29raW5nIGZvciBkYXRhYmFzZXNcIik7XG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIGRldmVsb3BtZW50IG1vZGUgZm9yIFRTIHN1cHBvcnQgdXNpbmcgVFMgTm9kZVxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMuZ2V0RW50cnlwb2ludCh7IGVudHJ5cG9pbnQsIGVudjogJ2RldmVsb3BtZW50JyB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgZGF0YWJhc2UgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICAvLyBNYW51YWxseSBzdGFydCB0aGUgc2VydmVyIGxpZmVjeWNsZSB3aXRob3V0IGxpc3RlbmluZyB0byBleHByZXNzIHBvcnRcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuXG4gICAgLy8gRmluZCBkYXRhYmFzZSBpbnN0YW5jZSAgICBcbiAgICBjb25zdCBkYnMgPSBhd2FpdCBnZXREYXRhYmFzZXMoaW5zdGFuY2UpO1xuXG4gICAgaWYgKCFkYnMgfHwgIWRicy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIGFueSBkYXRhYmFzZSByZWdpc3RlcmVkIGluIHRoZSBzdXBwbGllZCBzZXJ2ZXIgaW5zdGFuY2UsIG1ha2Ugc3VyZSBpdFxcJ3MgcmVnaXN0ZXJlZCBhcyBhIGNoaWxkIGNvbXBvbmVudCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFN1cHBvcnQgbXVsdGlwbGUgZGF0YWJhc2VzXG4gICAgY29uc3QgZGIgPSBkYnNbMF07XG5cbiAgICBpZiAoIWRiIHx8ICFkYi5xdWVyeSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhYmFzZSBoYXMgYW4gdW5rbm93biBpbnRlcmZhY2UsIG1ha2Ugc3VyZSBpdFxcJ3MgYSBUUyBGcmFtZXdvcmsgbW9kdWxlIGFuZCB0aGF0IGl0XFwncyB1cGRhdGVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdSdW5uaW5nIGRhdGFiYXNlIHF1ZXJ5JywgeyBkYXRhYmFzZTogZGIub3B0aW9ucy5uYW1lLCBxdWVyeTogb3B0aW9ucy5xdWVyeSB9KTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdEYXRhYmFzZSBxdWVyeSByZXN1bHQnLCB7IHJlc3VsdDogYXdhaXQgZGIucXVlcnkob3B0aW9ucy5xdWVyeSkgfSk7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=