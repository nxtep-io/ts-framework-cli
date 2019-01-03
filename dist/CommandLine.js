"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
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
];
exports.default = CommandLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZExpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsNkRBQTZEO0FBQzdELCtCQUErQjtBQUUvQixvQ0FBb0M7QUFDcEMsdUNBQXVDO0FBTzFCLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBc0I5QixZQUFtQixVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2pELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEtBQUs7YUFDUCxVQUFVLENBQUMsY0FBYyxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7YUFDckIsUUFBUSxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1FBRXZELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsS0FBSzthQUNQLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDVCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXpCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCw0Q0FBNEM7UUFDNUMsTUFBTSxNQUFNLEdBQTJCLE9BQU8sQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQzFDLE9BQU8sSUFBSSxPQUFPLGlCQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFLLFdBQVcsQ0FBQyxZQUFZLEVBQUcsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBOEIsRUFBRTtRQUN2RCxPQUFPLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLHlEQUF5RDtRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVksT0FBTzs7WUFDbEIsNkJBQTZCO1lBQzdCLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDN0Y7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBELGtDQUFrQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwRyxDQUFDO0tBQUE7O0FBeEVzQix3QkFBWSxHQUFHO0lBQ3BDLFVBQVUsRUFBRSwwQkFBa0I7SUFDOUIsSUFBSSxFQUFFLG9CQUFZO0lBQ2xCLEdBQUcsRUFBRSxtQkFBVztDQUNqQixDQUFDO0FBRXFCLDRCQUFnQixHQUFHO0lBQ3hDLEtBQUssQ0FBQyxlQUFlO0lBQ3JCLEtBQUssQ0FBQyxhQUFhO0lBQ25CLEtBQUssQ0FBQyxjQUFjO0lBQ3BCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLEtBQUssQ0FBQyxXQUFXO0lBQ2pCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLFFBQVEsQ0FBQyxzQkFBc0I7Q0FDaEMsQ0FBQztBQXBCSiw4QkE4RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSBcInlhcmdzXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4vQmFzZUNvbW1hbmRcIjtcbmltcG9ydCAqIGFzIEJhc2ljIGZyb20gXCIuL2NvbW1hbmRzXCI7XG5pbXBvcnQgKiBhcyBEYXRhYmFzZSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRMaW5lT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBjb21tYW5kcz86ICh0eXBlb2YgQmFzZUNvbW1hbmQpW107XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOVFJZUE9JTlQgPSBwcm9jZXNzLmVudi5FTlRSWVBPSU5UIHx8IFwiLi9hcGkvc2VydmVyLnRzXCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9FTlYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcImRldmVsb3BtZW50XCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9QT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kTGluZSB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgY29tbWFuZHM6IEJhc2VDb21tYW5kW107XG4gIHB1YmxpYyB5YXJnczogeWFyZ3MuQXJndjtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfT1BUUyA9IHtcbiAgICBlbnRyeXBvaW50OiBERUZBVUxUX0VOVFJZUE9JTlQsXG4gICAgcG9ydDogREVGQVVMVF9QT1JULFxuICAgIGVudjogREVGQVVMVF9FTlZcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfQ09NTUFORFMgPSBbXG4gICAgQmFzaWMuR2VuZXJhdGVDb21tYW5kLFxuICAgIEJhc2ljLkxpc3RlbkNvbW1hbmQsXG4gICAgQmFzaWMuQ29uc29sZUNvbW1hbmQsXG4gICAgQmFzaWMuUnVuQ29tbWFuZCxcbiAgICBCYXNpYy5XYXRjaENvbW1hbmQsXG4gICAgQmFzaWMuSW5mb0NvbW1hbmQsXG4gICAgQmFzaWMuQ2xlYW5Db21tYW5kLFxuICAgIERhdGFiYXNlLkRhdGFiYXNlQ29uc29sZUNvbW1hbmQsXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IENvbW1hbmRMaW5lT3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gUHJlcGFyZSBsb2dnZXIgYW5kIGluaXRpYWwgeWFyZ3MgaW5zdGFuY2VcbiAgICB0aGlzLnlhcmdzID0geWFyZ3MudXNhZ2UoXCJVc2FnZTogJDAgPGNvbW1hbmQ+IFsuLi5hcmdzXVwiKS53cmFwKE1hdGgubWluKDEyMCwgeWFyZ3MudGVybWluYWxXaWR0aCgpKSk7XG5cbiAgICAvLyBQcmVwYXJlIHZlcmJvc2Ugb3B0aW9uXG4gICAgdGhpcy55YXJnc1xuICAgICAgLnNjcmlwdE5hbWUoJ3RzLWZyYW1ld29yaycpXG4gICAgICAuYm9vbGVhbihcInZlcmJvc2VcIilcbiAgICAgIC5hbGlhcyhcIlZcIiwgXCJ2ZXJib3NlXCIpXG4gICAgICAuZGVzY3JpYmUoXCJ2ZXJib3NlXCIsIFwiUnVucyBjb21tYW5kIGluIHZlcmJvc2UgbW9kZVwiKTtcblxuICAgIC8vIFByZXBhcmUgaGVscCBndWlkZVxuICAgIHRoaXMueWFyZ3NcbiAgICAgIC5oZWxwKFwiaFwiKVxuICAgICAgLmFsaWFzKFwiaFwiLCBcImhlbHBcIilcbiAgICAgIC5hbGlhcyhcInZcIiwgXCJ2ZXJzaW9uXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXIgaW5zdGFuY2VcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBjb21tYW5kcyB1c2luZyBjdXJyZW50IG9wdGlvbnNcbiAgICBjb25zdCBjbWRBcnI6ICh0eXBlb2YgQmFzZUNvbW1hbmQpW10gPSBvcHRpb25zLmNvbW1hbmRzIHx8IENvbW1hbmRMaW5lLkRFRkFVTFRfQ09NTUFORFM7XG4gICAgdGhpcy5jb21tYW5kcyA9IGNtZEFyci5tYXAoKENvbW1hbmQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDb21tYW5kKHsgbG9nZ2VyOiB0aGlzLmxvZ2dlciwgLi4uQ29tbWFuZExpbmUuREVGQVVMVF9PUFRTIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gU3RhcnRzIGNvbW1hbmQgbW91bnRpbmdcbiAgICB0aGlzLm9uTW91bnQoKS5jYXRjaCh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQ29tbWFuZExpbmVPcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKG9wdGlvbnMpLnlhcmdzLmFyZ3Y7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcblxuICAgIC8vIEFzeW5jIGV4aXQgZm9yIGxvZyBwcm9jZXNzaW5nIHRvIG9jY3VyIGJlZm9yZSBjcmFzaGluZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCA1MDApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGV4Y2VwdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBCaW5kIGFsbCBjb21tYW5kcyB0byBjdXJyZW50IHByb2dyYW1cbiAgICB0aGlzLmNvbW1hbmRzLm1hcChjbWQgPT4gY21kLm9uUHJvZ3JhbSh0aGlzLnlhcmdzKSk7XG5cbiAgICAvLyBQcmVwYXJlIGFkZGl0aW9uYWwgaW5mbyBpbiBoZWxwXG4gICAgdGhpcy55YXJncy5lcGlsb2coZnMucmVhZEZpbGVTeW5jKFBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vcmF3L2NsaS5oZWxwLnR4dFwiKSkudG9TdHJpbmcoXCJ1dGYtOFwiKSk7XG4gIH1cbn1cbiJdfQ==