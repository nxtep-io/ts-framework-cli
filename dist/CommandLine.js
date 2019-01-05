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
    Database.DatabaseDropCommand,
    Database.DatabaseMigrateCommand,
];
exports.default = CommandLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZExpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsNkRBQTZEO0FBQzdELCtCQUErQjtBQUUvQixvQ0FBb0M7QUFDcEMsdUNBQXVDO0FBTzFCLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBd0I5QixZQUFtQixVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2pELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEtBQUs7YUFDUCxVQUFVLENBQUMsY0FBYyxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7YUFDckIsUUFBUSxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1FBRXZELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsS0FBSzthQUNQLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDVCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXpCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCw0Q0FBNEM7UUFDNUMsTUFBTSxNQUFNLEdBQTJCLE9BQU8sQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQzFDLE9BQU8sSUFBSSxPQUFPLGlCQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFLLFdBQVcsQ0FBQyxZQUFZLEVBQUcsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBOEIsRUFBRTtRQUN2RCxPQUFPLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLHlEQUF5RDtRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVksT0FBTzs7WUFDbEIsNkJBQTZCO1lBQzdCLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDN0Y7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBELGtDQUFrQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwRyxDQUFDO0tBQUE7O0FBMUVzQix3QkFBWSxHQUFHO0lBQ3BDLFVBQVUsRUFBRSwwQkFBa0I7SUFDOUIsSUFBSSxFQUFFLG9CQUFZO0lBQ2xCLEdBQUcsRUFBRSxtQkFBVztDQUNqQixDQUFDO0FBRXFCLDRCQUFnQixHQUFHO0lBQ3hDLEtBQUssQ0FBQyxlQUFlO0lBQ3JCLEtBQUssQ0FBQyxhQUFhO0lBQ25CLEtBQUssQ0FBQyxjQUFjO0lBQ3BCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLEtBQUssQ0FBQyxXQUFXO0lBQ2pCLEtBQUssQ0FBQyxZQUFZO0lBQ2xCLFFBQVEsQ0FBQyxzQkFBc0I7SUFDL0IsUUFBUSxDQUFDLG1CQUFtQjtJQUM1QixRQUFRLENBQUMsc0JBQXNCO0NBQ2hDLENBQUM7QUF0QkosOEJBZ0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCAqIGFzIHlhcmdzIGZyb20gXCJ5YXJnc1wiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgKiBhcyBCYXNpYyBmcm9tIFwiLi9jb21tYW5kc1wiO1xuaW1wb3J0ICogYXMgRGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTGluZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgY29tbWFuZHM/OiAodHlwZW9mIEJhc2VDb21tYW5kKVtdO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTlRSWVBPSU5UID0gcHJvY2Vzcy5lbnYuRU5UUllQT0lOVCB8fCBcIi4vYXBpL3NlcnZlci50c1wiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5WID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgXCJkZXZlbG9wbWVudFwiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWFuZExpbmUge1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHVibGljIGNvbW1hbmRzOiBCYXNlQ29tbWFuZFtdO1xuICBwdWJsaWMgeWFyZ3M6IHlhcmdzLkFyZ3Y7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX09QVFMgPSB7XG4gICAgZW50cnlwb2ludDogREVGQVVMVF9FTlRSWVBPSU5ULFxuICAgIHBvcnQ6IERFRkFVTFRfUE9SVCxcbiAgICBlbnY6IERFRkFVTFRfRU5WXG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0NPTU1BTkRTID0gW1xuICAgIEJhc2ljLkdlbmVyYXRlQ29tbWFuZCxcbiAgICBCYXNpYy5MaXN0ZW5Db21tYW5kLFxuICAgIEJhc2ljLkNvbnNvbGVDb21tYW5kLFxuICAgIEJhc2ljLlJ1bkNvbW1hbmQsXG4gICAgQmFzaWMuV2F0Y2hDb21tYW5kLFxuICAgIEJhc2ljLkluZm9Db21tYW5kLFxuICAgIEJhc2ljLkNsZWFuQ29tbWFuZCxcbiAgICBEYXRhYmFzZS5EYXRhYmFzZUNvbnNvbGVDb21tYW5kLFxuICAgIERhdGFiYXNlLkRhdGFiYXNlRHJvcENvbW1hbmQsXG4gICAgRGF0YWJhc2UuRGF0YWJhc2VNaWdyYXRlQ29tbWFuZCxcbiAgXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogQ29tbWFuZExpbmVPcHRpb25zID0ge30pIHtcbiAgICAvLyBQcmVwYXJlIGxvZ2dlciBhbmQgaW5pdGlhbCB5YXJncyBpbnN0YW5jZVxuICAgIHRoaXMueWFyZ3MgPSB5YXJncy51c2FnZShcIlVzYWdlOiAkMCA8Y29tbWFuZD4gWy4uLmFyZ3NdXCIpLndyYXAoTWF0aC5taW4oMTIwLCB5YXJncy50ZXJtaW5hbFdpZHRoKCkpKTtcblxuICAgIC8vIFByZXBhcmUgdmVyYm9zZSBvcHRpb25cbiAgICB0aGlzLnlhcmdzXG4gICAgICAuc2NyaXB0TmFtZSgndHMtZnJhbWV3b3JrJylcbiAgICAgIC5ib29sZWFuKFwidmVyYm9zZVwiKVxuICAgICAgLmFsaWFzKFwiVlwiLCBcInZlcmJvc2VcIilcbiAgICAgIC5kZXNjcmliZShcInZlcmJvc2VcIiwgXCJSdW5zIGNvbW1hbmQgaW4gdmVyYm9zZSBtb2RlXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBoZWxwIGd1aWRlXG4gICAgdGhpcy55YXJnc1xuICAgICAgLmhlbHAoXCJoXCIpXG4gICAgICAuYWxpYXMoXCJoXCIsIFwiaGVscFwiKVxuICAgICAgLmFsaWFzKFwidlwiLCBcInZlcnNpb25cIik7XG5cbiAgICAvLyBQcmVwYXJlIGxvZ2dlciBpbnN0YW5jZVxuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBJbml0aWFsaXplIGNvbW1hbmRzIHVzaW5nIGN1cnJlbnQgb3B0aW9uc1xuICAgIGNvbnN0IGNtZEFycjogKHR5cGVvZiBCYXNlQ29tbWFuZClbXSA9IG9wdGlvbnMuY29tbWFuZHMgfHwgQ29tbWFuZExpbmUuREVGQVVMVF9DT01NQU5EUztcbiAgICB0aGlzLmNvbW1hbmRzID0gY21kQXJyLm1hcCgoQ29tbWFuZDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENvbW1hbmQoeyBsb2dnZXI6IHRoaXMubG9nZ2VyLCAuLi5Db21tYW5kTGluZS5ERUZBVUxUX09QVFMgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBTdGFydHMgY29tbWFuZCBtb3VudGluZ1xuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDb21tYW5kTGluZU9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgQ29tbWFuZExpbmUob3B0aW9ucykueWFyZ3MuYXJndjtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXG4gICAgLy8gQXN5bmMgZXhpdCBmb3IgbG9nIHByb2Nlc3NpbmcgdG8gb2NjdXIgYmVmb3JlIGNyYXNoaW5nXG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDUwMCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Nb3VudCgpIHtcbiAgICAvLyBDaGVjayBUUyBOb2RlIGlzIGF2YWlsYWJsZVxuICAgIHRyeSB7XG4gICAgICByZXF1aXJlKFwidHMtbm9kZS9yZWdpc3Rlci90cmFuc3BpbGUtb25seVwiKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXhjZXB0aW9uKTtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEJpbmQgYWxsIGNvbW1hbmRzIHRvIGN1cnJlbnQgcHJvZ3JhbVxuICAgIHRoaXMuY29tbWFuZHMubWFwKGNtZCA9PiBjbWQub25Qcm9ncmFtKHRoaXMueWFyZ3MpKTtcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnlhcmdzLmVwaWxvZyhmcy5yZWFkRmlsZVN5bmMoUGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9yYXcvY2xpLmhlbHAudHh0XCIpKS50b1N0cmluZyhcInV0Zi04XCIpKTtcbiAgfVxufVxuIl19