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
class DatabaseMigrateCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "db:migrate",
            description: "Runs database schema pending migrations, if any",
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
            const port = process.env.PORT || options.port || this.options.port;
            const distributionFile = yield this.getEntrypoint({ entrypoint, env: 'development' });
            this.logger.debug(`Starting database in development environment from ${distributionFile}`);
            // Manually start the server lifecycle without listening to express port
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            // await instance.onInit();
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
            this.logger.info('Migrating database schema', { database: db.options.name });
            yield db.migrate();
            this.logger.info('Success');
            yield instance.close();
            return;
        });
    }
}
exports.default = DatabaseMigrateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VNaWdyYXRlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZU1pZ3JhdGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixzQkFBdUIsU0FBUSxxQkFBVTtJQUE5RDs7UUFDRSxZQUFPLEdBQUc7WUFDUixvQ0FBb0M7WUFDcEMsTUFBTSxFQUFFLFlBQVk7WUFDcEIsV0FBVyxFQUFFLGlEQUFpRDtZQUM5RCxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO3FCQUN4QixRQUFRLENBQUMsR0FBRyxFQUFFLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ3JFLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUFzQ0osQ0FBQztJQXBDYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsc0RBQXNEO1lBQ3RELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDbkUsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUUzRix3RUFBd0U7WUFDeEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFDekUsMkJBQTJCO1lBRTNCLDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSwrQkFBUztnQkFDakIsMkNBQTJDO2dCQUMzQyx5SEFBeUgsQ0FDMUgsQ0FBQzthQUNIO1lBRUQsbUNBQW1DO1lBQ25DLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDbkIsTUFBTSxJQUFJLCtCQUFTLENBQ2pCLHFHQUFxRyxDQUN0RyxDQUFDO2FBQ0g7WUFFRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0UsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsT0FBTzs7S0FDUjtDQUNGO0FBbERELHlDQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgUnVuQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IGdldERhdGFiYXNlcyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZU1pZ3JhdGVDb21tYW5kIGV4dGVuZHMgUnVuQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImRiOm1pZ3JhdGVcIixcbiAgICBkZXNjcmlwdGlvbjogXCJSdW5zIGRhdGFiYXNlIHNjaGVtYSBwZW5kaW5nIG1pZ3JhdGlvbnMsIGlmIGFueVwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwiZVwiKSBcbiAgICAgICAgLmFsaWFzKFwiZVwiLCBcImVudHJ5cG9pbnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZVwiLCBcIlNldHMgc2VydmVyIGVudHJ5cG9pbnQgZm9yIGxvb2tpbmcgZm9yIGRhdGFiYXNlc1wiKTtcbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgZGV2ZWxvcG1lbnQgbW9kZSBmb3IgVFMgc3VwcG9ydCB1c2luZyBUUyBOb2RlXG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLmdldEVudHJ5cG9pbnQoeyBlbnRyeXBvaW50LCBlbnY6ICdkZXZlbG9wbWVudCcgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIGRhdGFiYXNlIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgLy8gTWFudWFsbHkgc3RhcnQgdGhlIHNlcnZlciBsaWZlY3ljbGUgd2l0aG91dCBsaXN0ZW5pbmcgdG8gZXhwcmVzcyBwb3J0XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwgeyAuLi5vcHRpb25zLCBwb3J0IH0pO1xuICAgIC8vIGF3YWl0IGluc3RhbmNlLm9uSW5pdCgpO1xuXG4gICAgLy8gRmluZCBkYXRhYmFzZSBpbnN0YW5jZSAgICBcbiAgICBjb25zdCBkYnMgPSBhd2FpdCBnZXREYXRhYmFzZXMoaW5zdGFuY2UpO1xuXG4gICAgaWYgKCFkYnMgfHwgIWRicy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIGFueSBkYXRhYmFzZSByZWdpc3RlcmVkIGluIHRoZSBzdXBwbGllZCBzZXJ2ZXIgaW5zdGFuY2UsIG1ha2Ugc3VyZSBpdFxcJ3MgcmVnaXN0ZXJlZCBhcyBhIGNoaWxkIGNvbXBvbmVudCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFN1cHBvcnQgbXVsdGlwbGUgZGF0YWJhc2VzXG4gICAgY29uc3QgZGIgPSBkYnNbMF07XG5cbiAgICBpZiAoIWRiIHx8ICFkYi5kcm9wKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAnVGhlIGRhdGFiYXNlIGhhcyBhbiB1bmtub3duIGludGVyZmFjZSwgbWFrZSBzdXJlIGl0XFwncyBhIFRTIEZyYW1ld29yayBtb2R1bGUgYW5kIHRoYXQgaXRcXCdzIHVwZGF0ZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGF3YWl0IGRiLmNvbm5lY3QoKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdNaWdyYXRpbmcgZGF0YWJhc2Ugc2NoZW1hJywgeyBkYXRhYmFzZTogZGIub3B0aW9ucy5uYW1lIH0pO1xuICAgIGF3YWl0IGRiLm1pZ3JhdGUoKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdTdWNjZXNzJyk7XG4gICAgYXdhaXQgaW5zdGFuY2UuY2xvc2UoKTtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==