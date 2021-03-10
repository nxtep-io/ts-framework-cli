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
            const instance = yield this.load(entrypoint, Object.assign(Object.assign({}, options), { repl: new ts_framework_1.ReplConsole({
                    name: require("../../package.json").name
                }) }));
            yield instance.listen();
        });
    }
}
exports.default = ConsoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc29sZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvQ29uc29sZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNkI7QUFDN0IsNkRBQWdEO0FBQ2hELCtDQUFrRTtBQUNsRSxnREFBeUM7QUFFekMsTUFBcUIsY0FBZSxTQUFRLHFCQUFXO0lBQXZEOztRQUNFLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSxzQkFBc0I7WUFDOUIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxLQUFLO3FCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZ0VBQWdFLENBQUMsQ0FBQztZQUNyRixDQUFDO1NBQ0YsQ0FBQztJQWlDSixDQUFDO0lBL0JDOztPQUVHO0lBQ1UsSUFBSSxDQUFDLFlBQW9CLEVBQUUsT0FBdUI7O1lBQzdELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsMkNBQWEsWUFBWSxFQUFDLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7aUJBQ2pEO2dCQUVELE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSwrQkFBUyxDQUFDLG9DQUFvQyxTQUFTLENBQUMsT0FBTyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDMUY7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUU7O1lBQzdELE1BQU0sT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxrQ0FDdEMsT0FBTyxLQUNWLElBQUksRUFBRSxJQUFJLDBCQUFXLENBQUM7b0JBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2lCQUN6QyxDQUFDLElBQ0YsQ0FBQztZQUNILE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNGO0FBM0NELGlDQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyLCB7IFJlcGxDb25zb2xlLCBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwiY29uc29sZSBbZW50cnlwb2ludF1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTdGFydHMgdGhlIGludGVyYWN0aXZlIGNvbnNvbGVcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICByZXR1cm4geWFyZ3NcbiAgICAgICAgLnN0cmluZyhcInBcIilcbiAgICAgICAgLmFsaWFzKFwicFwiLCBcInBvcnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwicFwiLCBcIlRoZSBQT1JUIHRvIGxpc3RlbiB0bywgY2FuIGJlIG92ZXJyaWRlbiB3aXRoIFBPUlQgZW52IHZhcmlhYmxlXCIpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgU2VydmVyIG1vZHVsZSBhbmQgaW5pdGlhbGl6ZSBpdHMgaW5zdGFuY2UgZnJvbSByZWxhdGl2ZSBwYXRoLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiR7ZXhjZXB0aW9uLm1lc3NhZ2V9XCJgLCBleGNlcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBSRVBMIGNvbnNvbGUgaW4gdGhlIHN1cHBsaWVkIFNlcnZlciBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIHBvcnQgfSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgcG9ydCB8fCAzMDAwIH07XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZW50cnlwb2ludCwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHJlcGw6IG5ldyBSZXBsQ29uc29sZSh7XG4gICAgICAgIG5hbWU6IHJlcXVpcmUoXCIuLi8uLi9wYWNrYWdlLmpzb25cIikubmFtZVxuICAgICAgfSlcbiAgICB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5saXN0ZW4oKTtcbiAgfVxufVxuIl19