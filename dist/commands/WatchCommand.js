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
            description: "Starts the development server with live reload",
            builder: yargs => {
                yargs
                    .string("p")
                    .alias("p", "port")
                    .describe("p", "The PORT to listen to, can be overriden with PORT env variable");
                yargs
                    .string("i")
                    .alias("i", "inspect")
                    .describe("i", "Starts development server with inspection flags for debug");
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
            let exec = `${command} ${Path.join(__dirname, "../bin")} listen --development ${entrypoint}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsZ0RBQXlDO0FBRXpDLE1BQXFCLFlBQWEsU0FBUSxxQkFBVztJQUFyRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxnRUFBZ0UsQ0FBQyxDQUFDO2dCQUVuRixLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7cUJBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsMkRBQTJELENBQUMsQ0FBQztnQkFFOUUsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQXlDSixDQUFDO0lBdkNjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsVUFBVSxJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQ3BFLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUUzRSw0QkFBNEI7WUFDNUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUM5QyxNQUFNLE9BQU8sR0FBRyw0QkFBNEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3BHLElBQUksSUFBSSxHQUFHLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyx5QkFBeUIsVUFBVSxFQUFFLENBQUM7WUFDN0YsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRXZDLE9BQU8sQ0FBQztnQkFDTixJQUFJO2dCQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQ3hCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEdBQUcsRUFBRSxPQUFPO2dCQUNaLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNsQixLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQzthQUN0RCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxDQUFDOztLQUNKO0NBQ0Y7QUExREQsK0JBMERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTm9kZW1vbiBmcm9tIFwibm9kZW1vblwiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0Y2hDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJ3YXRjaCBbZW50cnlwb2ludF1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTdGFydHMgdGhlIGRldmVsb3BtZW50IHNlcnZlciB3aXRoIGxpdmUgcmVsb2FkXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLnN0cmluZyhcInBcIilcbiAgICAgICAgLmFsaWFzKFwicFwiLCBcInBvcnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwicFwiLCBcIlRoZSBQT1JUIHRvIGxpc3RlbiB0bywgY2FuIGJlIG92ZXJyaWRlbiB3aXRoIFBPUlQgZW52IHZhcmlhYmxlXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwiaVwiKVxuICAgICAgICAuYWxpYXMoXCJpXCIsIFwiaW5zcGVjdFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJpXCIsIFwiU3RhcnRzIGRldmVsb3BtZW50IHNlcnZlciB3aXRoIGluc3BlY3Rpb24gZmxhZ3MgZm9yIGRlYnVnXCIpO1xuXG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSAke1BhY2thZ2UubmFtZX1AJHtQYWNrYWdlLnZlcnNpb259YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHN0YXJ0aW5nIHNlcnZlciBmcm9tIFxcYCR7ZW50cnlwb2ludH1cXMK0YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHdhdGNoaW5nIGZpbGVzIGZyb20gIFxcYC4vKiovKlxcwrRgKTtcbiAgICBpZiAob3B0aW9ucy5pbnNwZWN0KSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gaW5zcGVjdCBtb2RlOiAgXFxgJHtvcHRpb25zLmluc3BlY3QudG9TdHJpbmcoKX1cXGBgKTtcbiAgICB9XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHRvIHJlc3RhcnQgYXQgYW55IHRpbWUsIGVudGVyIFxcYHJzXFxgXFxuYCk7XG5cbiAgICAvLyBQcmVwYXJlIGNvbW1hbmQgZXhlY3V0aW9uXG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgb3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGNvbW1hbmQgPSBgbm9kZSAtciB0cy1ub2RlL3JlZ2lzdGVyICR7b3B0aW9ucy5pbnNwZWN0ID8gYC0taW5zcGVjdD0ke29wdGlvbnMuaW5zcGVjdH1gIDogXCJcIn1gO1xuICAgIGxldCBleGVjID0gYCR7Y29tbWFuZH0gJHtQYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2JpblwiKX0gbGlzdGVuIC0tZGV2ZWxvcG1lbnQgJHtlbnRyeXBvaW50fWA7XG4gICAgZXhlYyArPSBwb3J0ID8gYCAtLXBvcnQgJHtwb3J0fSBgIDogXCJcIjtcblxuICAgIE5vZGVtb24oe1xuICAgICAgZXhlYyxcbiAgICAgIGRlYnVnOiAhIW9wdGlvbnMuaW5zcGVjdCxcbiAgICAgIGRlbGF5OiBcIjEwMDBcIixcbiAgICAgIGV4dDogXCJ0cyxqc1wiLFxuICAgICAgY3dkOiBwcm9jZXNzLmN3ZCgpLFxuICAgICAgd2F0Y2g6IFtcIi4vKiovKlwiXSxcbiAgICAgIGlnbm9yZTogW1wiLi9kaXN0XCIsIFwiLi9idWlsZFwiLCBcIi4vZG9jc1wiLCBcIi4vY292ZXJhZ2VcIl1cbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJyZXN0YXJ0XCIsIGZpbGVzID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gcmVzdGFydGluZyBkdWUgdG8gY2hhbmdlcy4uLlwiLCB7IGZpbGVzIH0pO1xuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcInF1aXRcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSB0ZXJtaW5hdGluZy4uLlwiKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJjcmFzaFwiLCBlcnJvciA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiW3RzLWZyYW1ld29ya10gaW5zdGFuY2UgY3Jhc2hlZCB1bmV4cGVjdGVkbHlcIiwgZXJyb3IpO1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSB3YWl0aW5nIGZvciBmaWxlcyBjaGFuZ2VzIGJlZm9yZSByZXN0YXJ0aW5nLi4uXCIpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=