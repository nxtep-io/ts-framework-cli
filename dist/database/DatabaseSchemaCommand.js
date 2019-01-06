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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VTY2hlbWFDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2RhdGFiYXNlL0RhdGFiYXNlU2NoZW1hQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELGtFQUErRDtBQUMvRCw2Q0FBNkM7QUFDN0MsZ0RBQXdDO0FBQ3hDLG9DQUF3QztBQUV4QyxNQUFxQixvQkFBcUIsU0FBUSxxQkFBVTtJQW1CMUQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFsQmpCLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUsV0FBVztZQUNuQixXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDZixLQUFLO3FCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUM7cUJBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUM7cUJBQ3hCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsa0RBQWtELENBQUMsQ0FBQztnQkFDckUsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO3FCQUN0QixRQUFRLENBQUMsR0FBRyxFQUFFLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ25FLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7UUFJQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLEVBQTBEO1lBQTFELEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksT0FBYyxFQUFaLDRDQUFVOztZQUN2RSxzREFBc0Q7WUFDdEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUks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OztLQUNSO0NBQ0Y7QUExR0QsdUNBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IE15c3FsRHJpdmVyIH0gZnJvbSAndHlwZW9ybS9kcml2ZXIvbXlzcWwvTXlzcWxEcml2ZXInO1xuaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBSdW5Db21tYW5kIGZyb20gXCIuLi9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgZ2V0RGF0YWJhc2VzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFiYXNlQ2hlY2tDb21tYW5kIGV4dGVuZHMgUnVuQ29tbWFuZCB7XG4gIGVudjogYW55O1xuICBjb21tYW5kID0ge1xuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogXCJkYjpzY2hlbWFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJSdW5zIGRhdGFiYXNlIHNjaGVtYSBjaGVja2luZyByb3V0aW5lc1wiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwiZVwiKVxuICAgICAgICAuYWxpYXMoXCJlXCIsIFwiZW50cnlwb2ludFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJlXCIsIFwiU2V0cyBzZXJ2ZXIgZW50cnlwb2ludCBmb3IgbG9va2luZyBmb3IgZGF0YWJhc2VzXCIpO1xuICAgICAgeWFyZ3NcbiAgICAgICAgLnN0cmluZyhcImdcIilcbiAgICAgICAgLmFsaWFzKFwiZ1wiLCBcImdlbmVyYXRlXCIpXG4gICAgICAgIC5kZXNjcmliZShcImdcIiwgXCJHZW5lcmF0ZSBhIG5ldyBtaWdyYXRpb24gZmlsZSB3aXRoIHNjaGVtYSBkaWZmXCIpO1xuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmVudiA9IHllb21hbi5jcmVhdGVFbnYoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIG5hbWUsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIGRldmVsb3BtZW50IG1vZGUgZm9yIFRTIHN1cHBvcnQgdXNpbmcgVFMgTm9kZVxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMuZ2V0RW50cnlwb2ludCh7IGVudHJ5cG9pbnQsIGVudjogJ2RldmVsb3BtZW50JyB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgZGF0YWJhc2UgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICAvLyBNYW51YWxseSBzdGFydCB0aGUgc2VydmVyIGxpZmVjeWNsZSB3aXRob3V0IGxpc3RlbmluZyB0byBleHByZXNzIHBvcnRcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG4gICAgLy8gYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG5cbiAgICAvLyBGaW5kIGRhdGFiYXNlIGluc3RhbmNlICAgIFxuICAgIGNvbnN0IGRicyA9IGF3YWl0IGdldERhdGFiYXNlcyhpbnN0YW5jZSk7XG5cbiAgICBpZiAoIWRicyB8fCAhZGJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgYW55IGRhdGFiYXNlIHJlZ2lzdGVyZWQgaW4gdGhlIHN1cHBsaWVkIHNlcnZlciBpbnN0YW5jZSwgbWFrZSBzdXJlIGl0XFwncyByZWdpc3RlcmVkIGFzIGEgY2hpbGQgY29tcG9uZW50JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBtdWx0aXBsZSBkYXRhYmFzZXNcbiAgICBjb25zdCBkYiA9IGRic1swXTtcblxuICAgIGlmICghZGIpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXG4gICAgICAgICdUaGUgZGF0YWJhc2UgaGFzIGFuIHVua25vd24gaW50ZXJmYWNlLCBtYWtlIHN1cmUgaXRcXCdzIGEgVFMgRnJhbWV3b3JrIG1vZHVsZSBhbmQgdGhhdCBpdFxcJ3MgdXBkYXRlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXdhaXQgZGIuY29ubmVjdCgpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ0NoZWNraW5nIGRhdGFiYXNlIHNjaGVtYScsIHsgZGF0YWJhc2U6IGRiLm9wdGlvbnMubmFtZSB9KTtcblxuICAgIC8vIFRPRE86IENoZWNrIGlzIGEgdHlwZW9ybSBkYXRhYmFzZSwgb3IgbWFrZSBpdCBnZW5lcmljXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IChkYiBhcyBhbnkpLmNvbm5lY3Rpb247XG4gICAgY29uc3Qgc3FsSW5NZW1vcnkgPSBhd2FpdCBjb25uZWN0aW9uLmRyaXZlci5jcmVhdGVTY2hlbWFCdWlsZGVyKCkubG9nKCk7XG4gICAgY29uc3QgdXBTcWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGRvd25TcWxzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKCF1cFNxbHMubGVuZ3RoICYmICFkb3duU3Fscy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoJ05vIG1pZ3JhdGlvbiBpcyBuZWVkZWQsIHNjaGVtYSBpcyBzeW5jaHJvbml6ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBteXNxbCBpcyBleGNlcHRpb25hbCBoZXJlIGJlY2F1c2UgaXQgdXNlcyBgIGNoYXJhY3RlciBpbiB0byBlc2NhcGUgbmFtZXMgaW4gcXVlcmllcywgdGhhdCdzIHdoeSBmb3IgbXlzcWxcbiAgICAvLyB3ZSBhcmUgdXNpbmcgc2ltcGxlIHF1b3RlZCBzdHJpbmcgaW5zdGVhZCBvZiB0ZW1wbGF0ZSBzdHJpbmcgc3ludGF4XG4gICAgaWYgKGNvbm5lY3Rpb24uZHJpdmVyIGluc3RhbmNlb2YgTXlzcWxEcml2ZXIpIHtcbiAgICAgIHNxbEluTWVtb3J5LnVwUXVlcmllcy5mb3JFYWNoKHF1ZXJ5ID0+IHtcbiAgICAgICAgdXBTcWxzLnB1c2goYGF3YWl0IHF1ZXJ5UnVubmVyLnF1ZXJ5KFxcYCR7cXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKGBcImAsIFwiZ1wiKSwgYFxcXFxcImApfVxcYCk7YCk7XG4gICAgICB9KTtcbiAgICAgIHNxbEluTWVtb3J5LmRvd25RdWVyaWVzLmZvckVhY2gocXVlcnkgPT4ge1xuICAgICAgICBkb3duU3Fscy5wdXNoKGBhd2FpdCBxdWVyeVJ1bm5lci5xdWVyeShcXGAke3F1ZXJ5LnJlcGxhY2UobmV3IFJlZ0V4cChgXCJgLCBcImdcIiksIGBcXFxcXCJgKX1cXGApO2ApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNxbEluTWVtb3J5LnVwUXVlcmllcy5mb3JFYWNoKHF1ZXJ5ID0+IHtcbiAgICAgICAgdXBTcWxzLnB1c2goYGF3YWl0IHF1ZXJ5UnVubmVyLnF1ZXJ5KFxcYCR7cXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKFwiYFwiLCBcImdcIiksIFwiXFxcXGBcIil9XFxgKTtgKTtcbiAgICAgIH0pO1xuICAgICAgc3FsSW5NZW1vcnkuZG93blF1ZXJpZXMuZm9yRWFjaChxdWVyeSA9PiB7XG4gICAgICAgIGRvd25TcWxzLnB1c2goYGF3YWl0IHF1ZXJ5UnVubmVyLnF1ZXJ5KFxcYCR7cXVlcnkucmVwbGFjZShuZXcgUmVnRXhwKFwiYFwiLCBcImdcIiksIFwiXFxcXGBcIil9XFxgKTtgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFByZXBhcmUgWWVvbWFuIGdlbmVyYXRvclxuICAgIC8vIEVuc3VyZSBlbnRpdHkgbmFtZSB3YXMgcHJvdmlkZWQgZm9yIGNvbXBvbmVudHNcbiAgICBpZiAob3B0aW9ucy5nZW5lcmF0ZSAmJiAhb3B0aW9ucy5nZW5lcmF0ZS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENhbm5vdCBub3QgZ2VuZXJhdGUgYSBzY2hlbWEgbWlncmF0aW9uIHdpdGhvdXQgYSB2YWxpZCBuYW1lYCk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmdlbmVyYXRlKSB7XG4gICAgICB0aGlzLmVudi5yZWdpc3RlcihyZXF1aXJlLnJlc29sdmUoJ2dlbmVyYXRvci10cy1mcmFtZXdvcmsvZ2VuZXJhdG9ycy9taWdyYXRpb24nKSwgYHRzLWZyYW1ld29ya2ApO1xuICAgICAgY29uc3Qgb3B0czogYW55ID0geyB1cDogdXBTcWxzLmpvaW4oJ1xcbiAgICAnKSwgZG93bjogZG93blNxbHMuam9pbignXFxuICAgICcpIH07XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgICB0aGlzLmVudi5ydW4oYHRzLWZyYW1ld29yayAke29wdGlvbnMuZ2VuZXJhdGV9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbygnU3VjY2VzcycsIHsgdXBTcWxzLCBkb3duU3FscyB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5jbG9zZSgpO1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19