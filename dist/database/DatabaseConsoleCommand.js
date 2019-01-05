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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VDb25zb2xlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZUNvbnNvbGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixlQUFnQixTQUFRLHFCQUFVO0lBQXZEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQztxQkFDeEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxrREFBa0QsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDO0lBMkNKLENBQUM7SUF6Q2MsR0FBRyxDQUFDLEVBQW9EO1lBQXBELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFjLEVBQVosb0NBQVU7O1lBQ2pFLDRDQUE0QztZQUM1QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBRS9ELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsc0JBQXNCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUV4RixJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7Z0JBQ3pCLCtCQUErQjtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1lBRUQsd0VBQXdFO1lBQ3hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Isb0JBQU8sT0FBTyxJQUFFLElBQUksSUFBRyxDQUFDO1lBQ3pFLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXpCLDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSwrQkFBUztnQkFDakIsMkNBQTJDO2dCQUMzQyx5SEFBeUgsQ0FDMUgsQ0FBQzthQUNIO1lBRUQsbUNBQW1DO1lBQ25DLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtnQkFDcEIsTUFBTSxJQUFJLCtCQUFTLENBQ2pCLHFHQUFxRyxDQUN0RyxDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckYsT0FBTzs7S0FDUjtDQUNGO0FBdkRELGtDQXVEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgUnVuQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IGdldERhdGFiYXNlcyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZUNvbW1hbmQgZXh0ZW5kcyBSdW5Db21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICAvLyBPdmVycmlkZSBzcGVjaWZpYyBjb25maWdpdXJhdGlvbnNcbiAgICBzeW50YXg6IFwiZGI6cXVlcnkgPHF1ZXJ5PlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJ1bnMgZGF0YWJhc2UgcXVlcnkgdXNpbmcgU2VydmVyIGVudHJ5cG9pbnRcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuYm9vbGVhbihcImVcIilcbiAgICAgICAgLmFsaWFzKFwiZVwiLCBcImVudHJ5cG9pbnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZVwiLCBcIlNldHMgc2VydmVyIGVudHJ5cG9pbnQgZm9yIGxvb2tpbmcgZm9yIGRhdGFiYXNlc1wiKTtcbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgcHJvZHVjdGlvbiB1bmxlc3MgZmxhZyB3YXMgc3VwcGxpZWRcbiAgICBjb25zdCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGVudiA9IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyBcImRldmVsb3BtZW50XCIgOiBcInByb2R1Y3Rpb25cIjtcblxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLmdldEVudHJ5cG9pbnQoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIGRhdGFiYXNlIGluIFwiJHtlbnZ9XCIgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICBpZiAoZW52ICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gXCJwcm9kdWN0aW9uXCI7XG4gICAgfVxuXG4gICAgLy8gTWFudWFsbHkgc3RhcnQgdGhlIHNlcnZlciBsaWZlY3ljbGUgd2l0aG91dCBsaXN0ZW5pbmcgdG8gZXhwcmVzcyBwb3J0XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwgeyAuLi5vcHRpb25zLCBwb3J0IH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLm9uSW5pdCgpO1xuICAgIGF3YWl0IGluc3RhbmNlLm9uUmVhZHkoKTtcblxuICAgIC8vIEZpbmQgZGF0YWJhc2UgaW5zdGFuY2UgICAgXG4gICAgY29uc3QgZGJzID0gYXdhaXQgZ2V0RGF0YWJhc2VzKGluc3RhbmNlKTtcblxuICAgIGlmICghZGJzIHx8ICFkYnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICdDb3VsZCBub3QgZmluZCBhbnkgZGF0YWJhc2UgcmVnaXN0ZXJlZCBpbiB0aGUgc3VwcGxpZWQgc2VydmVyIGluc3RhbmNlLCBtYWtlIHN1cmUgaXRcXCdzIHJlZ2lzdGVyZWQgYXMgYSBjaGlsZCBjb21wb25lbnQnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTdXBwb3J0IG11bHRpcGxlIGRhdGFiYXNlc1xuICAgIGNvbnN0IGRiID0gZGJzWzBdO1xuXG4gICAgaWYgKCFkYiB8fCAhZGIucXVlcnkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXG4gICAgICAgICdUaGUgZGF0YWJhc2UgaGFzIGFuIHVua25vd24gaW50ZXJmYWNlLCBtYWtlIHN1cmUgaXRcXCdzIGEgVFMgRnJhbWV3b3JrIG1vZHVsZSBhbmQgdGhhdCBpdFxcJ3MgdXBkYXRlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbygnUnVubmluZyBkYXRhYmFzZSBxdWVyeScsIHsgZGF0YWJhc2U6IGRiLm9wdGlvbnMubmFtZSwgcXVlcnk6IG9wdGlvbnMucXVlcnkgfSk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnRGF0YWJhc2UgcXVlcnkgcmVzdWx0JywgeyByZXN1bHQ6IGF3YWl0IGRiLnF1ZXJ5KG9wdGlvbnMucXVlcnkpIH0pO1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19