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
const Path = require("path");
const ts_framework_common_1 = require("ts-framework-common");
const ts_framework_1 = require("ts-framework");
const BaseCommand_1 = require("../BaseCommand");
class ConsoleCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "console [entrypoint]",
            description: "Starts the interactive console",
            builder: yargs => {
                return yargs
                    .string("p")
                    .alias("p", "port")
                    .describe("p", "The PORT to listen to, can be overriden with PORT env variable");
            }
        };
    }
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathToServer = Path.resolve(process.cwd(), relativePath);
            try {
                const Module = yield Promise.resolve().then(() => require(pathToServer));
                if (!Module || !Module.default) {
                    throw new Error("Module has no default export");
                }
                return new Module.default(options);
            }
            catch (exception) {
                throw new ts_framework_common_1.BaseError(`Could not load Server instance: "${exception.message}"`, exception);
            }
        });
    }
    /**
     * Runs the REPL console in the supplied Server instance.
     */
    run({ entrypoint = this.options.entrypoint, port }) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { port: process.env.PORT || port || 3000 };
            const instance = yield this.load(entrypoint, Object.assign({}, options, { repl: new ts_framework_1.ReplConsole({
                    name: require("../../package.json").name
                }) }));
            yield instance.listen();
        });
    }
}
exports.default = ConsoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc29sZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvQ29uc29sZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQsK0NBQWtFO0FBQ2xFLGdEQUF5QztBQUV6QyxNQUFxQixjQUFlLFNBQVEscUJBQVc7SUFBdkQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLHNCQUFzQjtZQUM5QixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDZixPQUFPLEtBQUs7cUJBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxnRUFBZ0UsQ0FBQyxDQUFDO1lBQ3JGLENBQUM7U0FDRixDQUFDO0lBaUNKLENBQUM7SUEvQkM7O09BRUc7SUFDVSxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRywyQ0FBYSxZQUFZLEVBQUMsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLCtCQUFTLENBQUMsb0NBQW9DLFNBQVMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUMxRjtRQUNILENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRTs7WUFDN0QsTUFBTSxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzNELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLG9CQUN0QyxPQUFPLElBQ1YsSUFBSSxFQUFFLElBQUksMEJBQVcsQ0FBQztvQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUk7aUJBQ3pDLENBQUMsSUFDRixDQUFDO1lBQ0gsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsQ0FBQztLQUFBO0NBQ0Y7QUEzQ0QsaUNBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBTZXJ2ZXIsIHsgUmVwbENvbnNvbGUsIFNlcnZlck9wdGlvbnMgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJjb25zb2xlIFtlbnRyeXBvaW50XVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YXJ0cyB0aGUgaW50ZXJhY3RpdmUgY29uc29sZVwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHJldHVybiB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwicFwiKVxuICAgICAgICAuYWxpYXMoXCJwXCIsIFwicG9ydFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJwXCIsIFwiVGhlIFBPUlQgdG8gbGlzdGVuIHRvLCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggUE9SVCBlbnYgdmFyaWFibGVcIik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBTZXJ2ZXIgbW9kdWxlIGFuZCBpbml0aWFsaXplIGl0cyBpbnN0YW5jZSBmcm9tIHJlbGF0aXZlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbG9hZChyZWxhdGl2ZVBhdGg6IHN0cmluZywgb3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBQcm9taXNlPFNlcnZlcj4ge1xuICAgIGNvbnN0IHBhdGhUb1NlcnZlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZVBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBNb2R1bGUgPSBhd2FpdCBpbXBvcnQocGF0aFRvU2VydmVyKTtcblxuICAgICAgaWYgKCFNb2R1bGUgfHwgIU1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6IFwiJHtleGNlcHRpb24ubWVzc2FnZX1cImAsIGV4Y2VwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIFJFUEwgY29uc29sZSBpbiB0aGUgc3VwcGxpZWQgU2VydmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgcG9ydCB9KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCBwb3J0IHx8IDMwMDAgfTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChlbnRyeXBvaW50LCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgcmVwbDogbmV3IFJlcGxDb25zb2xlKHtcbiAgICAgICAgbmFtZTogcmVxdWlyZShcIi4uLy4uL3BhY2thZ2UuanNvblwiKS5uYW1lXG4gICAgICB9KVxuICAgIH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLmxpc3RlbigpO1xuICB9XG59XG4iXX0=