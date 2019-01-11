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
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VEcm9wQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZURyb3BDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixtQkFBb0IsU0FBUSxxQkFBVTtJQUEzRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixvQ0FBb0M7WUFDcEMsTUFBTSxFQUFFLFNBQVM7WUFDakIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO3FCQUN4QixRQUFRLENBQUMsR0FBRyxFQUFFLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ3JFLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUFxQ0osQ0FBQztJQW5DYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsc0RBQXNEO1lBQ3RELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUUzRix3RUFBd0U7WUFDeEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFFekUsNkJBQTZCO1lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sb0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxJQUFJLCtCQUFTO2dCQUNqQiwyQ0FBMkM7Z0JBQzNDLHlIQUF5SCxDQUMxSCxDQUFDO2FBQ0g7WUFFRCxtQ0FBbUM7WUFDbkMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWxCLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFO2dCQUNuQixNQUFNLElBQUksK0JBQVMsQ0FDakIscUdBQXFHLENBQ3RHLENBQUM7YUFDSDtZQUVELE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1RSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QixNQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixPQUFPOztLQUNSO0NBQ0Y7QUFqREQsc0NBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBSdW5Db21tYW5kIGZyb20gXCIuLi9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgZ2V0RGF0YWJhc2VzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFiYXNlRHJvcENvbW1hbmQgZXh0ZW5kcyBSdW5Db21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICAvLyBPdmVycmlkZSBzcGVjaWZpYyBjb25maWdpdXJhdGlvbnNcbiAgICBzeW50YXg6IFwiZGI6ZHJvcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRyb3BzIGRhdGFiYXNlIHNjaGVtYVwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwiZVwiKSBcbiAgICAgICAgLmFsaWFzKFwiZVwiLCBcImVudHJ5cG9pbnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZVwiLCBcIlNldHMgc2VydmVyIGVudHJ5cG9pbnQgZm9yIGxvb2tpbmcgZm9yIGRhdGFiYXNlc1wiKTtcbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgZGV2ZWxvcG1lbnQgbW9kZSBmb3IgVFMgc3VwcG9ydCB1c2luZyBUUyBOb2RlXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52OiAnZGV2ZWxvcG1lbnQnIH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBkYXRhYmFzZSBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIC8vIE1hbnVhbGx5IHN0YXJ0IHRoZSBzZXJ2ZXIgbGlmZWN5Y2xlIHdpdGhvdXQgbGlzdGVuaW5nIHRvIGV4cHJlc3MgcG9ydFxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcblxuICAgIC8vIEZpbmQgZGF0YWJhc2UgaW5zdGFuY2UgICAgXG4gICAgY29uc3QgZGJzID0gYXdhaXQgZ2V0RGF0YWJhc2VzKGluc3RhbmNlKTtcblxuICAgIGlmICghZGJzIHx8ICFkYnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICdDb3VsZCBub3QgZmluZCBhbnkgZGF0YWJhc2UgcmVnaXN0ZXJlZCBpbiB0aGUgc3VwcGxpZWQgc2VydmVyIGluc3RhbmNlLCBtYWtlIHN1cmUgaXRcXCdzIHJlZ2lzdGVyZWQgYXMgYSBjaGlsZCBjb21wb25lbnQnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTdXBwb3J0IG11bHRpcGxlIGRhdGFiYXNlc1xuICAgIGNvbnN0IGRiID0gZGJzWzBdO1xuXG4gICAgaWYgKCFkYiB8fCAhZGIuZHJvcCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhYmFzZSBoYXMgYW4gdW5rbm93biBpbnRlcmZhY2UsIG1ha2Ugc3VyZSBpdFxcJ3MgYSBUUyBGcmFtZXdvcmsgbW9kdWxlIGFuZCB0aGF0IGl0XFwncyB1cGRhdGVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBhd2FpdCBkYi5jb25uZWN0KCk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnRHJvcHBpbmcgZGF0YWJhc2Ugc2NoZW1hJywgeyBkYXRhYmFzZTogZGIub3B0aW9ucy5uYW1lIH0pO1xuICAgIGF3YWl0IGRiLmRyb3AoKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdTdWNjZXNzJyk7XG4gICAgYXdhaXQgaW5zdGFuY2UuY2xvc2UoKTtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==