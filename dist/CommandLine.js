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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PORT = exports.DEFAULT_ENV = exports.DEFAULT_ENTRYPOINT = void 0;
const fs = require("fs");
const Path = require("path");
const ts_framework_common_1 = require("ts-framework-common");
const yargs = require("yargs");
const Basic = require("./commands");
const Database = require("./database");
exports.DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
exports.DEFAULT_ENV = process.env.NODE_ENV || "development";
exports.DEFAULT_PORT = process.env.PORT || 3000;
class CommandLine {
    constructor(options = {}) {
        this.options = options;
        // Prepare logger and initial yargs instance
        this.yargs = yargs.usage("Usage: $0 <command> [...args]").wrap(Math.min(120, yargs.terminalWidth()));
        // Prepare verbose option
        this.yargs
            .scriptName('ts-framework')
            .boolean("verbose")
            .alias("V", "verbose")
            .describe("verbose", "Runs command in verbose mode");
        // Prepare help guide
        this.yargs
            .help("h")
            .alias("h", "help")
            .alias("v", "version");
        // Prepare logger instance
        this.logger = options.logger || ts_framework_common_1.Logger.initialize();
        // Initialize commands using current options
        const cmdArr = options.commands || CommandLine.DEFAULT_COMMANDS;
        this.commands = cmdArr.map((Command) => {
            return new Command(Object.assign({ logger: this.logger }, CommandLine.DEFAULT_OPTS));
        });
        // Starts command mounting
        this.onMount().catch(this.onError.bind(this));
    }
    static initialize(options = {}) {
        return new CommandLine(options).yargs.argv;
    }
    onError(error) {
        this.logger.error(error);
        // Async exit for log processing to occur before crashing
        setTimeout(() => process.exit(1), 500);
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check TS Node is available
            try {
                require("ts-node/register/transpile-only");
            }
            catch (exception) {
                this.logger.warn(exception);
                this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
            }
            // Bind all commands to current program
            this.commands.map(cmd => cmd.onProgram(this.yargs));
            // Prepare additional info in help
            this.yargs.epilog(fs.readFileSync(Path.join(__dirname, "../raw/cli.help.txt")).toString("utf-8"));
        });
    }
}
exports.default = CommandLine;
CommandLine.DEFAULT_OPTS = {
    entrypoint: exports.DEFAULT_ENTRYPOINT,
    port: exports.DEFAULT_PORT,
    env: exports.DEFAULT_ENV
};
CommandLine.DEFAULT_COMMANDS = [
    Basic.GenerateCommand,
    Basic.ListenCommand,
    Basic.ConsoleCommand,
    Basic.RunCommand,
    Basic.WatchCommand,
    Basic.InfoCommand,
    Basic.CleanCommand,
    Database.DatabaseConsoleCommand,
    Database.DatabaseSchemaCommand,
    Database.DatabaseDropCommand,
    Database.DatabaseMigrateCommand,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZExpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw2REFBNkQ7QUFDN0QsK0JBQStCO0FBRS9CLG9DQUFvQztBQUNwQyx1Q0FBdUM7QUFPMUIsUUFBQSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQztBQUNqRSxRQUFBLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUM7QUFDcEQsUUFBQSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRXJELE1BQXFCLFdBQVc7SUF5QjlCLFlBQW1CLFVBQThCLEVBQUU7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDakQsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJHLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsS0FBSzthQUNQLFVBQVUsQ0FBQyxjQUFjLENBQUM7YUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQzthQUNyQixRQUFRLENBQUMsU0FBUyxFQUFFLDhCQUE4QixDQUFDLENBQUM7UUFFdkQscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNULEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFekIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXBELDRDQUE0QztRQUM1QyxNQUFNLE1BQU0sR0FBMkIsT0FBTyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUM7UUFDeEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFDMUMsT0FBTyxJQUFJLE9BQU8saUJBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUssV0FBVyxDQUFDLFlBQVksRUFBRyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUE4QixFQUFFO1FBQ3ZELE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIseURBQXlEO1FBQ3pELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFWSxPQUFPOztZQUNsQiw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUM1QztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUVBQXlFLENBQUMsQ0FBQzthQUM3RjtZQUVELHVDQUF1QztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFcEQsa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7S0FBQTs7QUFoRkgsOEJBaUZDO0FBNUV3Qix3QkFBWSxHQUFHO0lBQ3BDLFVBQVUsRUFBRSwwQkFBa0I7SUFDOUIsSUFBSSxFQUFFLG9CQUFZO0lBQ2xCLEdBQUcsRUFBRSxtQkFBVztDQUNqQixDQUFDO0FBRXFCLDRCQUFnQixHQUFHO0lBQ3hDLEtBQUssQ0FBQyxlQUFlO0lBQ3JCLEtBQUssQ0FBQyxhQUFhO0lBQ25CLEtBQUssQ0FBQyxjQUFjO0lBQ3BCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLEtBQUssQ0FBQyxXQUFXO0lBQ2pCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLFFBQVEsQ0FBQyxzQkFBc0I7SUFDL0IsUUFBUSxDQUFDLHFCQUFxQjtJQUM5QixRQUFRLENBQUMsbUJBQW1CO0lBQzVCLFFBQVEsQ0FBQyxzQkFBc0I7Q0FDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgKiBhcyB5YXJncyBmcm9tIFwieWFyZ3NcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0ICogYXMgQmFzaWMgZnJvbSBcIi4vY29tbWFuZHNcIjtcbmltcG9ydCAqIGFzIERhdGFiYXNlIGZyb20gXCIuL2RhdGFiYXNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZExpbmVPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGNvbW1hbmRzPzogKHR5cGVvZiBCYXNlQ29tbWFuZClbXTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5UUllQT0lOVCA9IHByb2Nlc3MuZW52LkVOVFJZUE9JTlQgfHwgXCIuL2FwaS9zZXJ2ZXIudHNcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHVibGljIHlhcmdzOiB5YXJncy5Bcmd2O1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9PUFRTID0ge1xuICAgIGVudHJ5cG9pbnQ6IERFRkFVTFRfRU5UUllQT0lOVCxcbiAgICBwb3J0OiBERUZBVUxUX1BPUlQsXG4gICAgZW52OiBERUZBVUxUX0VOVlxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9DT01NQU5EUyA9IFtcbiAgICBCYXNpYy5HZW5lcmF0ZUNvbW1hbmQsXG4gICAgQmFzaWMuTGlzdGVuQ29tbWFuZCxcbiAgICBCYXNpYy5Db25zb2xlQ29tbWFuZCxcbiAgICBCYXNpYy5SdW5Db21tYW5kLFxuICAgIEJhc2ljLldhdGNoQ29tbWFuZCxcbiAgICBCYXNpYy5JbmZvQ29tbWFuZCxcbiAgICBCYXNpYy5DbGVhbkNvbW1hbmQsXG4gICAgRGF0YWJhc2UuRGF0YWJhc2VDb25zb2xlQ29tbWFuZCxcbiAgICBEYXRhYmFzZS5EYXRhYmFzZVNjaGVtYUNvbW1hbmQsXG4gICAgRGF0YWJhc2UuRGF0YWJhc2VEcm9wQ29tbWFuZCxcbiAgICBEYXRhYmFzZS5EYXRhYmFzZU1pZ3JhdGVDb21tYW5kLFxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBDb21tYW5kTGluZU9wdGlvbnMgPSB7fSkge1xuICAgIC8vIFByZXBhcmUgbG9nZ2VyIGFuZCBpbml0aWFsIHlhcmdzIGluc3RhbmNlXG4gICAgdGhpcy55YXJncyA9IHlhcmdzLnVzYWdlKFwiVXNhZ2U6ICQwIDxjb21tYW5kPiBbLi4uYXJnc11cIikud3JhcChNYXRoLm1pbigxMjAsIHlhcmdzLnRlcm1pbmFsV2lkdGgoKSkpO1xuXG4gICAgLy8gUHJlcGFyZSB2ZXJib3NlIG9wdGlvblxuICAgIHRoaXMueWFyZ3NcbiAgICAgIC5zY3JpcHROYW1lKCd0cy1mcmFtZXdvcmsnKVxuICAgICAgLmJvb2xlYW4oXCJ2ZXJib3NlXCIpXG4gICAgICAuYWxpYXMoXCJWXCIsIFwidmVyYm9zZVwiKVxuICAgICAgLmRlc2NyaWJlKFwidmVyYm9zZVwiLCBcIlJ1bnMgY29tbWFuZCBpbiB2ZXJib3NlIG1vZGVcIik7XG5cbiAgICAvLyBQcmVwYXJlIGhlbHAgZ3VpZGVcbiAgICB0aGlzLnlhcmdzXG4gICAgICAuaGVscChcImhcIilcbiAgICAgIC5hbGlhcyhcImhcIiwgXCJoZWxwXCIpXG4gICAgICAuYWxpYXMoXCJ2XCIsIFwidmVyc2lvblwiKTtcblxuICAgIC8vIFByZXBhcmUgbG9nZ2VyIGluc3RhbmNlXG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBjb21tYW5kcyB1c2luZyBjdXJyZW50IG9wdGlvbnNcbiAgICBjb25zdCBjbWRBcnI6ICh0eXBlb2YgQmFzZUNvbW1hbmQpW10gPSBvcHRpb25zLmNvbW1hbmRzIHx8IENvbW1hbmRMaW5lLkRFRkFVTFRfQ09NTUFORFM7XG4gICAgdGhpcy5jb21tYW5kcyA9IGNtZEFyci5tYXAoKENvbW1hbmQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDb21tYW5kKHsgbG9nZ2VyOiB0aGlzLmxvZ2dlciwgLi4uQ29tbWFuZExpbmUuREVGQVVMVF9PUFRTIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gU3RhcnRzIGNvbW1hbmQgbW91bnRpbmdcbiAgICB0aGlzLm9uTW91bnQoKS5jYXRjaCh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQ29tbWFuZExpbmVPcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKG9wdGlvbnMpLnlhcmdzLmFyZ3Y7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcblxuICAgIC8vIEFzeW5jIGV4aXQgZm9yIGxvZyBwcm9jZXNzaW5nIHRvIG9jY3VyIGJlZm9yZSBjcmFzaGluZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCA1MDApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGV4Y2VwdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBCaW5kIGFsbCBjb21tYW5kcyB0byBjdXJyZW50IHByb2dyYW1cbiAgICB0aGlzLmNvbW1hbmRzLm1hcChjbWQgPT4gY21kLm9uUHJvZ3JhbSh0aGlzLnlhcmdzKSk7XG5cbiAgICAvLyBQcmVwYXJlIGFkZGl0aW9uYWwgaW5mbyBpbiBoZWxwXG4gICAgdGhpcy55YXJncy5lcGlsb2coZnMucmVhZEZpbGVTeW5jKFBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vcmF3L2NsaS5oZWxwLnR4dFwiKSkudG9TdHJpbmcoXCJ1dGYtOFwiKSk7XG4gIH1cbn1cbiJdfQ==