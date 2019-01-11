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
            // Force development mode for TS support using TS Node
            const port = options.port || this.options.port;
            const distributionFile = yield this.getEntrypoint({ entrypoint, env: 'development' });
            this.logger.debug(`Starting database in development environment from ${distributionFile}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VDb25zb2xlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZUNvbnNvbGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixlQUFnQixTQUFRLHFCQUFVO0lBQXZEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQztxQkFDeEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxrREFBa0QsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7U0FDRixDQUFDO0lBb0NKLENBQUM7SUFsQ2MsR0FBRyxDQUFDLEVBQW9EO1lBQXBELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFjLEVBQVosb0NBQVU7O1lBQ2pFLHNEQUFzRDtZQUN0RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFM0Ysd0VBQXdFO1lBQ3hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Isb0JBQU8sT0FBTyxJQUFFLElBQUksSUFBRyxDQUFDO1lBQ3pFLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXpCLDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSwrQkFBUztnQkFDakIsMkNBQTJDO2dCQUMzQyx5SEFBeUgsQ0FDMUgsQ0FBQzthQUNIO1lBRUQsbUNBQW1DO1lBQ25DLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtnQkFDcEIsTUFBTSxJQUFJLCtCQUFTLENBQ2pCLHFHQUFxRyxDQUN0RyxDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckYsT0FBTzs7S0FDUjtDQUNGO0FBaERELGtDQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgUnVuQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IGdldERhdGFiYXNlcyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZUNvbW1hbmQgZXh0ZW5kcyBSdW5Db21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICAvLyBPdmVycmlkZSBzcGVjaWZpYyBjb25maWdpdXJhdGlvbnNcbiAgICBzeW50YXg6IFwiZGI6cXVlcnkgPHF1ZXJ5PlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJ1bnMgZGF0YWJhc2UgcXVlcnkgdXNpbmcgU2VydmVyIGVudHJ5cG9pbnRcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuYm9vbGVhbihcImVcIilcbiAgICAgICAgLmFsaWFzKFwiZVwiLCBcImVudHJ5cG9pbnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZVwiLCBcIlNldHMgc2VydmVyIGVudHJ5cG9pbnQgZm9yIGxvb2tpbmcgZm9yIGRhdGFiYXNlc1wiKTtcbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgZGV2ZWxvcG1lbnQgbW9kZSBmb3IgVFMgc3VwcG9ydCB1c2luZyBUUyBOb2RlXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52OiAnZGV2ZWxvcG1lbnQnIH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBkYXRhYmFzZSBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIC8vIE1hbnVhbGx5IHN0YXJ0IHRoZSBzZXJ2ZXIgbGlmZWN5Y2xlIHdpdGhvdXQgbGlzdGVuaW5nIHRvIGV4cHJlc3MgcG9ydFxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG5cbiAgICAvLyBGaW5kIGRhdGFiYXNlIGluc3RhbmNlICAgIFxuICAgIGNvbnN0IGRicyA9IGF3YWl0IGdldERhdGFiYXNlcyhpbnN0YW5jZSk7XG5cbiAgICBpZiAoIWRicyB8fCAhZGJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgYW55IGRhdGFiYXNlIHJlZ2lzdGVyZWQgaW4gdGhlIHN1cHBsaWVkIHNlcnZlciBpbnN0YW5jZSwgbWFrZSBzdXJlIGl0XFwncyByZWdpc3RlcmVkIGFzIGEgY2hpbGQgY29tcG9uZW50JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBtdWx0aXBsZSBkYXRhYmFzZXNcbiAgICBjb25zdCBkYiA9IGRic1swXTtcblxuICAgIGlmICghZGIgfHwgIWRiLnF1ZXJ5KSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAnVGhlIGRhdGFiYXNlIGhhcyBhbiB1bmtub3duIGludGVyZmFjZSwgbWFrZSBzdXJlIGl0XFwncyBhIFRTIEZyYW1ld29yayBtb2R1bGUgYW5kIHRoYXQgaXRcXCdzIHVwZGF0ZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oJ1J1bm5pbmcgZGF0YWJhc2UgcXVlcnknLCB7IGRhdGFiYXNlOiBkYi5vcHRpb25zLm5hbWUsIHF1ZXJ5OiBvcHRpb25zLnF1ZXJ5IH0pO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ0RhdGFiYXNlIHF1ZXJ5IHJlc3VsdCcsIHsgcmVzdWx0OiBhd2FpdCBkYi5xdWVyeShvcHRpb25zLnF1ZXJ5KSB9KTtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==