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
const Nodemon = require("nodemon");
const Path = require("path");
const Package = require("pjson");
const BaseCommand_1 = require("../BaseCommand");
class WatchCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "watch [entrypoint]",
            description: "Starts the development server with live reload using the listen command",
            builder: yargs => {
                yargs
                    .string("p")
                    .alias("p", "port")
                    .describe("p", "The PORT to listen to, can be overriden with PORT env variable");
                yargs
                    .string("i")
                    .alias("i", "inspect")
                    .describe("i", "Starts development server with inspection flags for debug");
                yargs
                    .string("r")
                    .alias("r", "run")
                    .describe("r", "Starts the development server using the run command");
                return yargs;
            }
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`[ts-framework] ${Package.name}@${Package.version}`);
            this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
            this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
            if (options.inspect) {
                this.logger.debug(`[ts-framework] inspect mode:  \`${options.inspect.toString()}\``);
            }
            this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\`\n`);
            // Prepare command execution
            const port = process.env.PORT || options.port;
            const command = `node -r ts-node/register ${options.inspect ? `--inspect=${options.inspect}` : ""}`;
            // tslint:disable-next-line:max-line-length
            let exec = `${command} ${Path.join(__dirname, "../bin")} ${options.run ? "run" : "listen"} --development ${entrypoint}`;
            exec += port ? ` --port ${port} ` : "";
            Nodemon({
                exec,
                debug: !!options.inspect,
                delay: "1000",
                ext: "ts,js",
                cwd: process.cwd(),
                watch: ["./**/*"],
                ignore: ["./dist", "./build", "./docs", "./coverage"]
            });
            Nodemon.on("restart", files => {
                this.logger.debug("[ts-framework] restarting due to changes...", { files });
            });
            Nodemon.on("quit", () => {
                this.logger.debug("[ts-framework] terminating...");
                process.exit(1);
            });
            Nodemon.on("crash", error => {
                this.logger.warn("[ts-framework] instance crashed unexpectedly", error);
                this.logger.debug("[ts-framework] waiting for files changes before restarting...");
            });
        });
    }
}
exports.default = WatchCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsZ0RBQXlDO0FBRXpDLE1BQXFCLFlBQWEsU0FBUSxxQkFBVztJQUFyRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLFdBQVcsRUFBRSx5RUFBeUU7WUFDdEYsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxnRUFBZ0UsQ0FBQyxDQUFDO2dCQUVuRixLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7cUJBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsMkRBQTJELENBQUMsQ0FBQztnQkFFOUUsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO3FCQUNqQixRQUFRLENBQUMsR0FBRyxFQUFFLHFEQUFxRCxDQUFDLENBQUE7Z0JBRXZFLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUEyQ0osQ0FBQztJQXpDYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNwRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0RjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFFM0UsNEJBQTRCO1lBQzVCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDOUMsTUFBTSxPQUFPLEdBQUcsNEJBQTRCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUVwRywyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLGtCQUFrQixVQUFVLEVBQUUsQ0FBQztZQUN4SCxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFdkMsT0FBTyxDQUFDO2dCQUNOLElBQUk7Z0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDeEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsR0FBRyxFQUFFLE9BQU87Z0JBQ1osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO2FBQ3RELENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7O0tBQ0o7Q0FDRjtBQWpFRCwrQkFpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBOb2RlbW9uIGZyb20gXCJub2RlbW9uXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRjaENvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcIndhdGNoIFtlbnRyeXBvaW50XVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YXJ0cyB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyIHdpdGggbGl2ZSByZWxvYWQgdXNpbmcgdGhlIGxpc3RlbiBjb21tYW5kXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLnN0cmluZyhcInBcIilcbiAgICAgICAgLmFsaWFzKFwicFwiLCBcInBvcnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwicFwiLCBcIlRoZSBQT1JUIHRvIGxpc3RlbiB0bywgY2FuIGJlIG92ZXJyaWRlbiB3aXRoIFBPUlQgZW52IHZhcmlhYmxlXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwiaVwiKVxuICAgICAgICAuYWxpYXMoXCJpXCIsIFwiaW5zcGVjdFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJpXCIsIFwiU3RhcnRzIGRldmVsb3BtZW50IHNlcnZlciB3aXRoIGluc3BlY3Rpb24gZmxhZ3MgZm9yIGRlYnVnXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwiclwiKVxuICAgICAgICAuYWxpYXMoXCJyXCIsIFwicnVuXCIpXG4gICAgICAgIC5kZXNjcmliZShcInJcIiwgXCJTdGFydHMgdGhlIGRldmVsb3BtZW50IHNlcnZlciB1c2luZyB0aGUgcnVuIGNvbW1hbmRcIilcblxuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gJHtQYWNrYWdlLm5hbWV9QCR7UGFja2FnZS52ZXJzaW9ufWApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSBzdGFydGluZyBzZXJ2ZXIgZnJvbSBcXGAke2VudHJ5cG9pbnR9XFzCtGApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB3YXRjaGluZyBmaWxlcyBmcm9tICBcXGAuLyoqLypcXMK0YCk7XG4gICAgaWYgKG9wdGlvbnMuaW5zcGVjdCkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIGluc3BlY3QgbW9kZTogIFxcYCR7b3B0aW9ucy5pbnNwZWN0LnRvU3RyaW5nKCl9XFxgYCk7XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB0byByZXN0YXJ0IGF0IGFueSB0aW1lLCBlbnRlciBcXGByc1xcYFxcbmApO1xuXG4gICAgLy8gUHJlcGFyZSBjb21tYW5kIGV4ZWN1dGlvblxuICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IG9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBjb21tYW5kID0gYG5vZGUgLXIgdHMtbm9kZS9yZWdpc3RlciAke29wdGlvbnMuaW5zcGVjdCA/IGAtLWluc3BlY3Q9JHtvcHRpb25zLmluc3BlY3R9YCA6IFwiXCJ9YDtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBsZXQgZXhlYyA9IGAke2NvbW1hbmR9ICR7UGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9iaW5cIil9ICR7b3B0aW9ucy5ydW4gPyBcInJ1blwiIDogXCJsaXN0ZW5cIn0gLS1kZXZlbG9wbWVudCAke2VudHJ5cG9pbnR9YDtcbiAgICBleGVjICs9IHBvcnQgPyBgIC0tcG9ydCAke3BvcnR9IGAgOiBcIlwiO1xuXG4gICAgTm9kZW1vbih7XG4gICAgICBleGVjLFxuICAgICAgZGVidWc6ICEhb3B0aW9ucy5pbnNwZWN0LFxuICAgICAgZGVsYXk6IFwiMTAwMFwiLFxuICAgICAgZXh0OiBcInRzLGpzXCIsXG4gICAgICBjd2Q6IHByb2Nlc3MuY3dkKCksXG4gICAgICB3YXRjaDogW1wiLi8qKi8qXCJdLFxuICAgICAgaWdub3JlOiBbXCIuL2Rpc3RcIiwgXCIuL2J1aWxkXCIsIFwiLi9kb2NzXCIsIFwiLi9jb3ZlcmFnZVwiXVxuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcInJlc3RhcnRcIiwgZmlsZXMgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSByZXN0YXJ0aW5nIGR1ZSB0byBjaGFuZ2VzLi4uXCIsIHsgZmlsZXMgfSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicXVpdFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHRlcm1pbmF0aW5nLi4uXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcImNyYXNoXCIsIGVycm9yID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJbdHMtZnJhbWV3b3JrXSBpbnN0YW5jZSBjcmFzaGVkIHVuZXhwZWN0ZWRseVwiLCBlcnJvcik7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHdhaXRpbmcgZm9yIGZpbGVzIGNoYW5nZXMgYmVmb3JlIHJlc3RhcnRpbmcuLi5cIik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==