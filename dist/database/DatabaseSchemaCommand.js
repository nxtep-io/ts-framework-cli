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
const MysqlDriver_1 = require("typeorm/driver/mysql/MysqlDriver");
const yeoman = require("yeoman-environment");
const BaseCommand_1 = require("../BaseCommand");
const utils_1 = require("../utils");
class DatabaseCheckCommand extends BaseCommand_1.default {
    constructor(options = {}) {
        super(options);
        this.command = {
            // Override specific configiurations
            syntax: "db:schema",
            description: "Runs database schema checking routines",
            builder: yargs => {
                yargs
                    .boolean("e")
                    .alias("e", "entrypoint")
                    .describe("e", "Sets server entrypoint for looking for databases");
                yargs
                    .string("g")
                    .alias("g", "generate")
                    .describe("g", "Generate a new migration file with schema diff");
                return yargs;
            }
        };
        this.env = yeoman.createEnv();
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint, name } = _a, options = __rest(_a, ["entrypoint", "name"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Force development mode for TS support using TS Node
            const port = options.port || this.options.port;
            const distributionFile = yield this.getEntrypoint({ entrypoint, env: 'development' });
            this.logger.debug(`Starting database in development environment from ${distributionFile}`);
            // Manually start the server lifecycle without listening to express port
            const instance = yield this.load(distributionFile, Object.assign(Object.assign({}, options), { port }));
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
            if (!db) {
                throw new ts_framework_common_1.BaseError('The database has an unknown interface, make sure it\'s a TS Framework module and that it\'s updated');
            }
            yield db.connect();
            this.logger.info('Checking database schema', { database: db.options.name });
            // TODO: Check is a typeorm database, or make it generic
            const connection = db.connection;
            const sqlInMemory = yield connection.driver.createSchemaBuilder().log();
            const upSqls = [];
            const downSqls = [];
            if (!upSqls.length && !downSqls.length) {
                throw new ts_framework_common_1.BaseError('No migration is needed, schema is synchronized');
            }
            // mysql is exceptional here because it uses ` character in to escape names in queries, that's why for mysql
            // we are using simple quoted string instead of template string syntax
            if (connection.driver instanceof MysqlDriver_1.MysqlDriver) {
                sqlInMemory.upQueries.forEach(query => {
                    upSqls.push(`await queryRunner.query(\`${query.replace(new RegExp(`"`, "g"), `\\"`)}\`);`);
                });
                sqlInMemory.downQueries.forEach(query => {
                    downSqls.push(`await queryRunner.query(\`${query.replace(new RegExp(`"`, "g"), `\\"`)}\`);`);
                });
            }
            else {
                sqlInMemory.upQueries.forEach(query => {
                    upSqls.push(`await queryRunner.query(\`${query.replace(new RegExp("`", "g"), "\\`")}\`);`);
                });
                sqlInMemory.downQueries.forEach(query => {
                    downSqls.push(`await queryRunner.query(\`${query.replace(new RegExp("`", "g"), "\\`")}\`);`);
                });
            }
            // Prepare Yeoman generator
            // Ensure entity name was provided for components
            if (options.generate && !options.generate.length) {
                throw new ts_framework_common_1.BaseError(`Cannot not generate a schema migration without a valid name`);
            }
            else if (options.generate) {
                this.env.register(require.resolve('generator-ts-framework/generators/migration'), `ts-framework`);
                const opts = { up: upSqls.join('\n    '), down: downSqls.join('\n    ') };
                yield new Promise((resolve, reject) => this.env.run(`ts-framework ${options.generate}`, opts, error => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                }));
            }
            this.logger.info('Success', { upSqls, downSqls });
            yield instance.close();
            return;
        });
    }
}
exports.default = DatabaseCheckCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VTY2hlbWFDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2RhdGFiYXNlL0RhdGFiYXNlU2NoZW1hQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELGtFQUErRDtBQUMvRCw2Q0FBNkM7QUFDN0MsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixvQkFBcUIsU0FBUSxxQkFBVTtJQW1CMUQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFsQmpCLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsV0FBVztZQUNuQixXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDZixLQUFLO3FCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUM7cUJBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUM7cUJBQ3hCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsa0RBQWtELENBQUMsQ0FBQztnQkFDckUsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO3FCQUN0QixRQUFRLENBQUMsR0FBRyxFQUFFLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ25FLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7UUFJQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLEVBQTBEO1lBQTFELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksT0FBYyxFQUFULE9BQU8sY0FBeEQsc0JBQTBELENBQUY7O1lBQ3ZFLHNEQUFzRDtZQUN0RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFM0Ysd0VBQXdFO1lBQ3hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Isa0NBQU8sT0FBTyxLQUFFLElBQUksSUFBRyxDQUFDO1lBQ3pFLDJCQUEyQjtZQUUzQiw2QkFBNkI7WUFDN0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLElBQUksK0JBQVM7Z0JBQ2pCLDJDQUEyQztnQkFDM0MseUhBQXlILENBQzFILENBQUM7YUFDSDtZQUVELG1DQUFtQztZQUNuQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDUCxNQUFNLElBQUksK0JBQVMsQ0FDakIscUdBQXFHLENBQ3RHLENBQUM7YUFDSDtZQUVELE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUU1RSx3REFBd0Q7WUFDeEQsTUFBTSxVQUFVLEdBQUksRUFBVSxDQUFDLFVBQVUsQ0FBQztZQUMxQyxNQUFNLFdBQVcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4RSxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7WUFDNUIsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1lBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsTUFBTSxJQUFJLCtCQUFTLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUN2RTtZQUVELDRHQUE0RztZQUM1RyxzRUFBc0U7WUFDdEUsSUFBSSxVQUFVLENBQUMsTUFBTSxZQUFZLHlCQUFXLEVBQUU7Z0JBQzVDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdGLENBQUMsQ0FBQyxDQUFDO2dCQUNILFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLDZCQUE2QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9GLENBQUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0YsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELDJCQUEyQjtZQUMzQixpREFBaUQ7WUFDakQsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hELE1BQU0sSUFBSSwrQkFBUyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7YUFDcEY7aUJBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2xHLE1BQU0sSUFBSSxHQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDL0UsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDN0QsSUFBSSxLQUFLLEVBQUU7d0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2dCQUNILENBQUMsQ0FBQyxDQUNILENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLE9BQU87O0tBQ1I7Q0FDRjtBQTFHRCx1Q0EwR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgTXlzcWxEcml2ZXIgfSBmcm9tICd0eXBlb3JtL2RyaXZlci9teXNxbC9NeXNxbERyaXZlcic7XG5pbXBvcnQgKiBhcyB5ZW9tYW4gZnJvbSBcInllb21hbi1lbnZpcm9ubWVudFwiO1xuaW1wb3J0IFJ1bkNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBnZXREYXRhYmFzZXMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2VDaGVja0NvbW1hbmQgZXh0ZW5kcyBSdW5Db21tYW5kIHtcbiAgZW52OiBhbnk7XG4gIGNvbW1hbmQgPSB7XG4gICAgLy8gT3ZlcnJpZGUgc3BlY2lmaWMgY29uZmlnaXVyYXRpb25zXG4gICAgc3ludGF4OiBcImRiOnNjaGVtYVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJ1bnMgZGF0YWJhc2Ugc2NoZW1hIGNoZWNraW5nIHJvdXRpbmVzXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJlXCIpXG4gICAgICAgIC5hbGlhcyhcImVcIiwgXCJlbnRyeXBvaW50XCIpXG4gICAgICAgIC5kZXNjcmliZShcImVcIiwgXCJTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBsb29raW5nIGZvciBkYXRhYmFzZXNcIik7XG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwiZ1wiKVxuICAgICAgICAuYWxpYXMoXCJnXCIsIFwiZ2VuZXJhdGVcIilcbiAgICAgICAgLmRlc2NyaWJlKFwiZ1wiLCBcIkdlbmVyYXRlIGEgbmV3IG1pZ3JhdGlvbiBmaWxlIHdpdGggc2NoZW1hIGRpZmZcIik7XG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuZW52ID0geWVvbWFuLmNyZWF0ZUVudigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgbmFtZSwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgZGV2ZWxvcG1lbnQgbW9kZSBmb3IgVFMgc3VwcG9ydCB1c2luZyBUUyBOb2RlXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5nZXRFbnRyeXBvaW50KHsgZW50cnlwb2ludCwgZW52OiAnZGV2ZWxvcG1lbnQnIH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBkYXRhYmFzZSBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIC8vIE1hbnVhbGx5IHN0YXJ0IHRoZSBzZXJ2ZXIgbGlmZWN5Y2xlIHdpdGhvdXQgbGlzdGVuaW5nIHRvIGV4cHJlc3MgcG9ydFxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcbiAgICAvLyBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcblxuICAgIC8vIEZpbmQgZGF0YWJhc2UgaW5zdGFuY2UgICAgXG4gICAgY29uc3QgZGJzID0gYXdhaXQgZ2V0RGF0YWJhc2VzKGluc3RhbmNlKTtcblxuICAgIGlmICghZGJzIHx8ICFkYnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICdDb3VsZCBub3QgZmluZCBhbnkgZGF0YWJhc2UgcmVnaXN0ZXJlZCBpbiB0aGUgc3VwcGxpZWQgc2VydmVyIGluc3RhbmNlLCBtYWtlIHN1cmUgaXRcXCdzIHJlZ2lzdGVyZWQgYXMgYSBjaGlsZCBjb21wb25lbnQnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTdXBwb3J0IG11bHRpcGxlIGRhdGFiYXNlc1xuICAgIGNvbnN0IGRiID0gZGJzWzBdO1xuXG4gICAgaWYgKCFkYikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhYmFzZSBoYXMgYW4gdW5rbm93biBpbnRlcmZhY2UsIG1ha2Ugc3VyZSBpdFxcJ3MgYSBUUyBGcmFtZXdvcmsgbW9kdWxlIGFuZCB0aGF0IGl0XFwncyB1cGRhdGVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBhd2FpdCBkYi5jb25uZWN0KCk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnQ2hlY2tpbmcgZGF0YWJhc2Ugc2NoZW1hJywgeyBkYXRhYmFzZTogZGIub3B0aW9ucy5uYW1lIH0pO1xuXG4gICAgLy8gVE9ETzogQ2hlY2sgaXMgYSB0eXBlb3JtIGRhdGFiYXNlLCBvciBtYWtlIGl0IGdlbmVyaWNcbiAgICBjb25zdCBjb25uZWN0aW9uID0gKGRiIGFzIGFueSkuY29ubmVjdGlvbjtcbiAgICBjb25zdCBzcWxJbk1lbW9yeSA9IGF3YWl0IGNvbm5lY3Rpb24uZHJpdmVyLmNyZWF0ZVNjaGVtYUJ1aWxkZXIoKS5sb2coKTtcbiAgICBjb25zdCB1cFNxbHM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgZG93blNxbHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAoIXVwU3Fscy5sZW5ndGggJiYgIWRvd25TcWxzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcignTm8gbWlncmF0aW9uIGlzIG5lZWRlZCwgc2NoZW1hIGlzIHN5bmNocm9uaXplZCcpO1xuICAgIH1cblxuICAgIC8vIG15c3FsIGlzIGV4Y2VwdGlvbmFsIGhlcmUgYmVjYXVzZSBpdCB1c2VzIGAgY2hhcmFjdGVyIGluIHRvIGVzY2FwZSBuYW1lcyBpbiBxdWVyaWVzLCB0aGF0J3Mgd2h5IGZvciBteXNxbFxuICAgIC8vIHdlIGFyZSB1c2luZyBzaW1wbGUgcXVvdGVkIHN0cmluZyBpbnN0ZWFkIG9mIHRlbXBsYXRlIHN0cmluZyBzeW50YXhcbiAgICBpZiAoY29ubmVjdGlvbi5kcml2ZXIgaW5zdGFuY2VvZiBNeXNxbERyaXZlcikge1xuICAgICAgc3FsSW5NZW1vcnkudXBRdWVyaWVzLmZvckVhY2gocXVlcnkgPT4ge1xuICAgICAgICB1cFNxbHMucHVzaChgYXdhaXQgcXVlcnlSdW5uZXIucXVlcnkoXFxgJHtxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoYFwiYCwgXCJnXCIpLCBgXFxcXFwiYCl9XFxgKTtgKTtcbiAgICAgIH0pO1xuICAgICAgc3FsSW5NZW1vcnkuZG93blF1ZXJpZXMuZm9yRWFjaChxdWVyeSA9PiB7XG4gICAgICAgIGRvd25TcWxzLnB1c2goYGF3YWl0IHF1ZXJ5UnVubmVyLnF1ZXJ5KFxcYCR7cXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKGBcImAsIFwiZ1wiKSwgYFxcXFxcImApfVxcYCk7YCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3FsSW5NZW1vcnkudXBRdWVyaWVzLmZvckVhY2gocXVlcnkgPT4ge1xuICAgICAgICB1cFNxbHMucHVzaChgYXdhaXQgcXVlcnlSdW5uZXIucXVlcnkoXFxgJHtxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJgXCIsIFwiZ1wiKSwgXCJcXFxcYFwiKX1cXGApO2ApO1xuICAgICAgfSk7XG4gICAgICBzcWxJbk1lbW9yeS5kb3duUXVlcmllcy5mb3JFYWNoKHF1ZXJ5ID0+IHtcbiAgICAgICAgZG93blNxbHMucHVzaChgYXdhaXQgcXVlcnlSdW5uZXIucXVlcnkoXFxgJHtxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJgXCIsIFwiZ1wiKSwgXCJcXFxcYFwiKX1cXGApO2ApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlcGFyZSBZZW9tYW4gZ2VuZXJhdG9yXG4gICAgLy8gRW5zdXJlIGVudGl0eSBuYW1lIHdhcyBwcm92aWRlZCBmb3IgY29tcG9uZW50c1xuICAgIGlmIChvcHRpb25zLmdlbmVyYXRlICYmICFvcHRpb25zLmdlbmVyYXRlLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ2Fubm90IG5vdCBnZW5lcmF0ZSBhIHNjaGVtYSBtaWdyYXRpb24gd2l0aG91dCBhIHZhbGlkIG5hbWVgKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZ2VuZXJhdGUpIHtcbiAgICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZSgnZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzL21pZ3JhdGlvbicpLCBgdHMtZnJhbWV3b3JrYCk7XG4gICAgICBjb25zdCBvcHRzOiBhbnkgPSB7IHVwOiB1cFNxbHMuam9pbignXFxuICAgICcpLCBkb3duOiBkb3duU3Fscy5qb2luKCdcXG4gICAgJykgfTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAgIHRoaXMuZW52LnJ1bihgdHMtZnJhbWV3b3JrICR7b3B0aW9ucy5nZW5lcmF0ZX1gLCBvcHRzLCBlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdTdWNjZXNzJywgeyB1cFNxbHMsIGRvd25TcWxzIH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLmNsb3NlKCk7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=