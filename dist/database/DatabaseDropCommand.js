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
            this.logger.info('Dropping database schema', { database: db.options.name });
            yield db.drop();
            this.logger.info('Success');
            yield instance.close();
            return;
        });
    }
}
exports.default = DatabaseDropCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VEcm9wQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZURyb3BDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBZ0Q7QUFDaEQsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixtQkFBb0IsU0FBUSxxQkFBVTtJQUEzRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixvQ0FBb0M7WUFDcEMsTUFBTSxFQUFFLFNBQVM7WUFDakIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO3FCQUN4QixRQUFRLENBQUMsR0FBRyxFQUFFLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ3JFLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUE2Q0osQ0FBQztJQTNDYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsNENBQTRDO1lBQzVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFFL0QsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXhGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCx3RUFBd0U7WUFDeEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFDekUsMkJBQTJCO1lBRTNCLDZCQUE2QjtZQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSwrQkFBUztnQkFDakIsMkNBQTJDO2dCQUMzQyx5SEFBeUgsQ0FDMUgsQ0FBQzthQUNIO1lBRUQsbUNBQW1DO1lBQ25DLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDbkIsTUFBTSxJQUFJLCtCQUFTLENBQ2pCLHFHQUFxRyxDQUN0RyxDQUFDO2FBQ0g7WUFFRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsT0FBTzs7S0FDUjtDQUNGO0FBekRELHNDQXlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgUnVuQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IGdldERhdGFiYXNlcyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZURyb3BDb21tYW5kIGV4dGVuZHMgUnVuQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImRiOmRyb3BcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEcm9wcyBkYXRhYmFzZSBzY2hlbWFcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuYm9vbGVhbihcImVcIikgXG4gICAgICAgIC5hbGlhcyhcImVcIiwgXCJlbnRyeXBvaW50XCIpXG4gICAgICAgIC5kZXNjcmliZShcImVcIiwgXCJTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBsb29raW5nIGZvciBkYXRhYmFzZXNcIik7XG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gdW5sZXNzIGZsYWcgd2FzIHN1cHBsaWVkXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBlbnYgPSBvcHRpb25zLmRldmVsb3BtZW50ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCI7XG5cbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBkYXRhYmFzZSBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIC8vIE1hbnVhbGx5IHN0YXJ0IHRoZSBzZXJ2ZXIgbGlmZWN5Y2xlIHdpdGhvdXQgbGlzdGVuaW5nIHRvIGV4cHJlc3MgcG9ydFxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcbiAgICAvLyBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcblxuICAgIC8vIEZpbmQgZGF0YWJhc2UgaW5zdGFuY2UgICAgXG4gICAgY29uc3QgZGJzID0gYXdhaXQgZ2V0RGF0YWJhc2VzKGluc3RhbmNlKTtcblxuICAgIGlmICghZGJzIHx8ICFkYnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICdDb3VsZCBub3QgZmluZCBhbnkgZGF0YWJhc2UgcmVnaXN0ZXJlZCBpbiB0aGUgc3VwcGxpZWQgc2VydmVyIGluc3RhbmNlLCBtYWtlIHN1cmUgaXRcXCdzIHJlZ2lzdGVyZWQgYXMgYSBjaGlsZCBjb21wb25lbnQnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTdXBwb3J0IG11bHRpcGxlIGRhdGFiYXNlc1xuICAgIGNvbnN0IGRiID0gZGJzWzBdO1xuXG4gICAgaWYgKCFkYiB8fCAhZGIuZHJvcCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhYmFzZSBoYXMgYW4gdW5rbm93biBpbnRlcmZhY2UsIG1ha2Ugc3VyZSBpdFxcJ3MgYSBUUyBGcmFtZXdvcmsgbW9kdWxlIGFuZCB0aGF0IGl0XFwncyB1cGRhdGVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBhd2FpdCBkYi5jb25uZWN0KCk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnRHJvcHBpbmcgZGF0YWJhc2Ugc2NoZW1hJywgeyBkYXRhYmFzZTogZGIub3B0aW9ucy5uYW1lIH0pO1xuICAgIGF3YWl0IGRiLmRyb3AoKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdTdWNjZXNzJyk7XG4gICAgYXdhaXQgaW5zdGFuY2UuY2xvc2UoKTtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==