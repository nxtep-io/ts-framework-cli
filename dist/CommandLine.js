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
exports.DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
exports.DEFAULT_ENV = process.env.NODE_ENV || "development";
exports.DEFAULT_PORT = process.env.PORT || 3000;
class CommandLine {
    constructor(options = {}) {
        this.options = options;
        const Package = require("../package.json");
        // Prepare logger and initial yargs instance
        this.yargs = yargs.usage("Usage: $0 <command> [...args]").wrap(Math.min(120, yargs.terminalWidth()));
        // Prepare verbose option
        this.yargs
            .scriptName(Package.name)
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
    Basic.CleanCommand,
];
exports.default = CommandLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZExpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsNkRBQTZEO0FBQzdELCtCQUErQjtBQUUvQixvQ0FBb0M7QUFPdkIsUUFBQSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQztBQUNqRSxRQUFBLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUM7QUFDcEQsUUFBQSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRXJELE1BQXFCLFdBQVc7SUFvQjlCLFlBQW1CLFVBQThCLEVBQUU7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDakQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFM0MsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJHLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsS0FBSzthQUNQLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7YUFDckIsUUFBUSxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1FBRXZELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsS0FBSzthQUNQLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDVCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXpCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCw0Q0FBNEM7UUFDNUMsTUFBTSxNQUFNLEdBQTJCLE9BQU8sQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQzFDLE9BQU8sSUFBSSxPQUFPLGlCQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFLLFdBQVcsQ0FBQyxZQUFZLEVBQUcsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBOEIsRUFBRTtRQUN2RCxPQUFPLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLHlEQUF5RDtRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVksT0FBTzs7WUFDbEIsNkJBQTZCO1lBQzdCLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDN0Y7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBELGtDQUFrQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwRyxDQUFDO0tBQUE7O0FBeEVzQix3QkFBWSxHQUFHO0lBQ3BDLFVBQVUsRUFBRSwwQkFBa0I7SUFDOUIsSUFBSSxFQUFFLG9CQUFZO0lBQ2xCLEdBQUcsRUFBRSxtQkFBVztDQUNqQixDQUFDO0FBRXFCLDRCQUFnQixHQUFHO0lBQ3hDLEtBQUssQ0FBQyxlQUFlO0lBQ3JCLEtBQUssQ0FBQyxhQUFhO0lBQ25CLEtBQUssQ0FBQyxjQUFjO0lBQ3BCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLEtBQUssQ0FBQyxZQUFZO0NBQ25CLENBQUM7QUFsQkosOEJBOEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCAqIGFzIHlhcmdzIGZyb20gXCJ5YXJnc1wiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgKiBhcyBCYXNpYyBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRMaW5lT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBjb21tYW5kcz86ICh0eXBlb2YgQmFzZUNvbW1hbmQpW107XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOVFJZUE9JTlQgPSBwcm9jZXNzLmVudi5FTlRSWVBPSU5UIHx8IFwiLi9hcGkvc2VydmVyLnRzXCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9FTlYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcImRldmVsb3BtZW50XCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9QT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kTGluZSB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgY29tbWFuZHM6IEJhc2VDb21tYW5kW107XG4gIHB1YmxpYyB5YXJnczogeWFyZ3MuQXJndjtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfT1BUUyA9IHtcbiAgICBlbnRyeXBvaW50OiBERUZBVUxUX0VOVFJZUE9JTlQsXG4gICAgcG9ydDogREVGQVVMVF9QT1JULFxuICAgIGVudjogREVGQVVMVF9FTlZcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfQ09NTUFORFMgPSBbXG4gICAgQmFzaWMuR2VuZXJhdGVDb21tYW5kLFxuICAgIEJhc2ljLkxpc3RlbkNvbW1hbmQsXG4gICAgQmFzaWMuQ29uc29sZUNvbW1hbmQsXG4gICAgQmFzaWMuUnVuQ29tbWFuZCxcbiAgICBCYXNpYy5XYXRjaENvbW1hbmQsXG4gICAgQmFzaWMuQ2xlYW5Db21tYW5kLFxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBDb21tYW5kTGluZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IFBhY2thZ2UgPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXIgYW5kIGluaXRpYWwgeWFyZ3MgaW5zdGFuY2VcbiAgICB0aGlzLnlhcmdzID0geWFyZ3MudXNhZ2UoXCJVc2FnZTogJDAgPGNvbW1hbmQ+IFsuLi5hcmdzXVwiKS53cmFwKE1hdGgubWluKDEyMCwgeWFyZ3MudGVybWluYWxXaWR0aCgpKSk7XG5cbiAgICAvLyBQcmVwYXJlIHZlcmJvc2Ugb3B0aW9uXG4gICAgdGhpcy55YXJnc1xuICAgICAgLnNjcmlwdE5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLmJvb2xlYW4oXCJ2ZXJib3NlXCIpXG4gICAgICAuYWxpYXMoXCJWXCIsIFwidmVyYm9zZVwiKVxuICAgICAgLmRlc2NyaWJlKFwidmVyYm9zZVwiLCBcIlJ1bnMgY29tbWFuZCBpbiB2ZXJib3NlIG1vZGVcIik7XG5cbiAgICAvLyBQcmVwYXJlIGhlbHAgZ3VpZGVcbiAgICB0aGlzLnlhcmdzXG4gICAgICAuaGVscChcImhcIilcbiAgICAgIC5hbGlhcyhcImhcIiwgXCJoZWxwXCIpXG4gICAgICAuYWxpYXMoXCJ2XCIsIFwidmVyc2lvblwiKTtcblxuICAgIC8vIFByZXBhcmUgbG9nZ2VyIGluc3RhbmNlXG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIEluaXRpYWxpemUgY29tbWFuZHMgdXNpbmcgY3VycmVudCBvcHRpb25zXG4gICAgY29uc3QgY21kQXJyOiAodHlwZW9mIEJhc2VDb21tYW5kKVtdID0gb3B0aW9ucy5jb21tYW5kcyB8fCBDb21tYW5kTGluZS5ERUZBVUxUX0NPTU1BTkRTO1xuICAgIHRoaXMuY29tbWFuZHMgPSBjbWRBcnIubWFwKChDb21tYW5kOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ29tbWFuZCh7IGxvZ2dlcjogdGhpcy5sb2dnZXIsIC4uLkNvbW1hbmRMaW5lLkRFRkFVTFRfT1BUUyB9KTtcbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0cyBjb21tYW5kIG1vdW50aW5nXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IENvbW1hbmRMaW5lT3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBDb21tYW5kTGluZShvcHRpb25zKS55YXJncy5hcmd2O1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG5cbiAgICAvLyBBc3luYyBleGl0IGZvciBsb2cgcHJvY2Vzc2luZyB0byBvY2N1ciBiZWZvcmUgY3Jhc2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihleGNlcHRpb24pO1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcblxcbldBUk46IFRTIE5vZGUgaXMgbm90IGF2YWlsYWJsZSwgdHlwZXNjcmlwdCBmaWxlcyB3b24ndCBiZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gQmluZCBhbGwgY29tbWFuZHMgdG8gY3VycmVudCBwcm9ncmFtXG4gICAgdGhpcy5jb21tYW5kcy5tYXAoY21kID0+IGNtZC5vblByb2dyYW0odGhpcy55YXJncykpO1xuXG4gICAgLy8gUHJlcGFyZSBhZGRpdGlvbmFsIGluZm8gaW4gaGVscFxuICAgIHRoaXMueWFyZ3MuZXBpbG9nKGZzLnJlYWRGaWxlU3luYyhQYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3Jhdy9jbGkuaGVscC50eHRcIikpLnRvU3RyaW5nKFwidXRmLThcIikpO1xuICB9XG59XG4iXX0=