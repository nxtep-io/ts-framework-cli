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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsZ0RBQXlDO0FBRXpDLE1BQXFCLFlBQWEsU0FBUSxxQkFBVztJQUFyRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLFdBQVcsRUFBRSx5RUFBeUU7WUFDdEYsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxnRUFBZ0UsQ0FBQyxDQUFDO2dCQUVuRixLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7cUJBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsMkRBQTJELENBQUMsQ0FBQztnQkFFOUUsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO3FCQUNqQixRQUFRLENBQUMsR0FBRyxFQUFFLHFEQUFxRCxDQUFDLENBQUE7Z0JBRXZFLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUEwQ0osQ0FBQztJQXhDYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNwRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0RjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFFM0UsNEJBQTRCO1lBQzVCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDOUMsTUFBTSxPQUFPLEdBQUcsNEJBQTRCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUVwRyxJQUFJLElBQUksR0FBRyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsa0JBQWtCLFVBQVUsRUFBRSxDQUFDO1lBQ3hILElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUV2QyxPQUFPLENBQUM7Z0JBQ04sSUFBSTtnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUN4QixLQUFLLEVBQUUsTUFBTTtnQkFDYixHQUFHLEVBQUUsT0FBTztnQkFDWixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7YUFDdEQsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQzs7S0FDSjtDQUNGO0FBaEVELCtCQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5vZGVtb24gZnJvbSBcIm5vZGVtb25cIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGNoQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwid2F0Y2ggW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3RhcnRzIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXIgd2l0aCBsaXZlIHJlbG9hZCB1c2luZyB0aGUgbGlzdGVuIGNvbW1hbmRcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwicFwiKVxuICAgICAgICAuYWxpYXMoXCJwXCIsIFwicG9ydFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJwXCIsIFwiVGhlIFBPUlQgdG8gbGlzdGVuIHRvLCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggUE9SVCBlbnYgdmFyaWFibGVcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJpXCIpXG4gICAgICAgIC5hbGlhcyhcImlcIiwgXCJpbnNwZWN0XCIpXG4gICAgICAgIC5kZXNjcmliZShcImlcIiwgXCJTdGFydHMgZGV2ZWxvcG1lbnQgc2VydmVyIHdpdGggaW5zcGVjdGlvbiBmbGFncyBmb3IgZGVidWdcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJyXCIpXG4gICAgICAgIC5hbGlhcyhcInJcIiwgXCJydW5cIilcbiAgICAgICAgLmRlc2NyaWJlKFwiclwiLCBcIlN0YXJ0cyB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyIHVzaW5nIHRoZSBydW4gY29tbWFuZFwiKVxuXG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSAke1BhY2thZ2UubmFtZX1AJHtQYWNrYWdlLnZlcnNpb259YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHN0YXJ0aW5nIHNlcnZlciBmcm9tIFxcYCR7ZW50cnlwb2ludH1cXMK0YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHdhdGNoaW5nIGZpbGVzIGZyb20gIFxcYC4vKiovKlxcwrRgKTtcbiAgICBpZiAob3B0aW9ucy5pbnNwZWN0KSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gaW5zcGVjdCBtb2RlOiAgXFxgJHtvcHRpb25zLmluc3BlY3QudG9TdHJpbmcoKX1cXGBgKTtcbiAgICB9XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHRvIHJlc3RhcnQgYXQgYW55IHRpbWUsIGVudGVyIFxcYHJzXFxgXFxuYCk7XG5cbiAgICAvLyBQcmVwYXJlIGNvbW1hbmQgZXhlY3V0aW9uXG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgb3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGNvbW1hbmQgPSBgbm9kZSAtciB0cy1ub2RlL3JlZ2lzdGVyICR7b3B0aW9ucy5pbnNwZWN0ID8gYC0taW5zcGVjdD0ke29wdGlvbnMuaW5zcGVjdH1gIDogXCJcIn1gO1xuXG4gICAgbGV0IGV4ZWMgPSBgJHtjb21tYW5kfSAke1BhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vYmluXCIpfSAke29wdGlvbnMucnVuID8gXCJydW5cIiA6IFwibGlzdGVuXCJ9IC0tZGV2ZWxvcG1lbnQgJHtlbnRyeXBvaW50fWA7XG4gICAgZXhlYyArPSBwb3J0ID8gYCAtLXBvcnQgJHtwb3J0fSBgIDogXCJcIjtcblxuICAgIE5vZGVtb24oe1xuICAgICAgZXhlYyxcbiAgICAgIGRlYnVnOiAhIW9wdGlvbnMuaW5zcGVjdCxcbiAgICAgIGRlbGF5OiBcIjEwMDBcIixcbiAgICAgIGV4dDogXCJ0cyxqc1wiLFxuICAgICAgY3dkOiBwcm9jZXNzLmN3ZCgpLFxuICAgICAgd2F0Y2g6IFtcIi4vKiovKlwiXSxcbiAgICAgIGlnbm9yZTogW1wiLi9kaXN0XCIsIFwiLi9idWlsZFwiLCBcIi4vZG9jc1wiLCBcIi4vY292ZXJhZ2VcIl1cbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJyZXN0YXJ0XCIsIGZpbGVzID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gcmVzdGFydGluZyBkdWUgdG8gY2hhbmdlcy4uLlwiLCB7IGZpbGVzIH0pO1xuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcInF1aXRcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSB0ZXJtaW5hdGluZy4uLlwiKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJjcmFzaFwiLCBlcnJvciA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiW3RzLWZyYW1ld29ya10gaW5zdGFuY2UgY3Jhc2hlZCB1bmV4cGVjdGVkbHlcIiwgZXJyb3IpO1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSB3YWl0aW5nIGZvciBmaWxlcyBjaGFuZ2VzIGJlZm9yZSByZXN0YXJ0aW5nLi4uXCIpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=