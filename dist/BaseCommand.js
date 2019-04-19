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
const utils_1 = require("./utils");
class BaseCommand {
    constructor(options = {}) {
        this.options = options;
        this.run = this.run.bind(this);
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    /**
     * Gets the distribution path registered in the tsconfig.json file.
     */
    getDistributionPath() {
        return __awaiter(this, void 0, void 0, function* () {
            // Try to find transpiled directory using tsconfig
            const config = yield utils_1.tsConfig();
            return Path.resolve(process.cwd(), config.compilerOptions.outDir);
        });
    }
    getEntrypoint({ env, entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceFile = Path.resolve(process.cwd(), entrypoint);
            if (env === "development") {
                // Load directly from specified entrypoint in development mode
                return sourceFile;
            }
            // In production, we need to handle TS files
            if (Path.extname(sourceFile) === ".ts") {
                // Try to find transpiled directory using tsconfig
                const distributionPath = yield this.getDistributionPath();
                // Check if the transpiled sources directory already exists
                if (!fs.existsSync(distributionPath)) {
                    this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
                    yield utils_1.exec("yarn tsc");
                }
                // Try to find transpiled file from specified source
                const fileName = Path.basename(sourceFile, ".ts");
                const relativePath = Path.relative(process.cwd(), Path.dirname(sourceFile));
                let distributionFile = Path.join(distributionPath, relativePath, `${fileName}.js`);
                if (!fs.existsSync(distributionFile)) {
                    // Try to find in distribution root, as a last attempt to make it work
                    const fileName = Path.basename(sourceFile, ".ts");
                    distributionFile = Path.join(distributionPath, `${fileName}.js`);
                    if (fs.existsSync(distributionFile)) {
                        // Runs from transpiled file
                        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                    }
                    else {
                        this.logger.verbose(`Could not find transpiled file"`);
                        0;
                    }
                }
                else {
                    // Runs from transpiled file
                    this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                }
                return distributionFile;
            }
            // Entrypoint doesn't need to be transpiled
            return sourceFile;
        });
    }
    /**
     * Loads a new module from its relative path to cwd and initialize its instance.
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
                console.error(exception);
                throw new ts_framework_common_1.BaseError(`Could not load Server instance: "${exception.message}"`);
            }
        });
    }
    /**
     * Handles Yargs instance registration.
     */
    onProgram(yargs) {
        return __awaiter(this, void 0, void 0, function* () {
            // Bind command action
            const handler = (argv) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.run.apply(this, [argv]);
                }
                catch (exception) {
                    this.logger.error(exception);
                    setTimeout(() => process.exit(1), 1000);
                }
            });
            // Register the command definition
            return yargs.command({
                handler,
                command: this.command.syntax,
                describe: this.command.description,
                builder: this.command.builder
            });
        });
    }
}
exports.default = BaseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQmFzZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0IsNkRBQXdFO0FBRXhFLG1DQUF5QztBQXdCekMsTUFBOEIsV0FBVztJQUl2QyxZQUFtQixVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ1UsbUJBQW1COztZQUM5QixrREFBa0Q7WUFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBUSxFQUFFLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FBQTtJQUVZLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7O1lBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTNELElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsOERBQThEO2dCQUM5RCxPQUFPLFVBQVUsQ0FBQzthQUNuQjtZQUVELDRDQUE0QztZQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN0QyxrREFBa0Q7Z0JBQ2xELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFFMUQsMkRBQTJEO2dCQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDckcsTUFBTSxZQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3hCO2dCQUVELG9EQUFvRDtnQkFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxHQUFHLFFBQVEsS0FBSyxDQUFDLENBQUM7Z0JBRW5GLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3BDLHNFQUFzRTtvQkFDdEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2xELGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDO29CQUVqRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTt3QkFDbkMsNEJBQTRCO3dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO3FCQUN6RTt5QkFBTTt3QkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3dCQUN2RCxDQUFDLENBQUE7cUJBQ0Y7aUJBQ0Y7cUJBQU07b0JBQ0wsNEJBQTRCO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2lCQUN6RTtnQkFFRCxPQUFPLGdCQUFnQixDQUFDO2FBQ3pCO1lBRUQsMkNBQTJDO1lBQzNDLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ2EsSUFBSSxDQUFDLFlBQW9CLEVBQUUsT0FBdUI7O1lBQ2hFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsMkNBQWEsWUFBWSxFQUFDLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7aUJBQ2pEO2dCQUVELE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sSUFBSSwrQkFBUyxDQUFDLG9DQUFvQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzthQUMvRTtRQUNILENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsU0FBUyxDQUFDLEtBQVc7O1lBQ2hDLHNCQUFzQjtZQUN0QixNQUFNLE9BQU8sR0FBRyxDQUFNLElBQUksRUFBQyxFQUFFO2dCQUMzQixJQUFJO29CQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUMzQztnQkFBQyxPQUFPLFNBQVMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQSxDQUFDO1lBRUYsa0NBQWtDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsT0FBTztnQkFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUM1QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUNsQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQzlCLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQU1GO0FBaEhELDhCQWdIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBTZXJ2ZXIsIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IEJhc2VFcnJvciwgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBBcmd2IH0gZnJvbSBcInlhcmdzXCI7XG5pbXBvcnQgeyBleGVjLCB0c0NvbmZpZyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUNvbW1hbmRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVudHJ5cG9pbnQ/OiBzdHJpbmc7XG4gIHBvcnQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGVudj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kZXJEZWZzIHtcbiAgc3ludGF4OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGhhbmRsZXI/OlxuICAgIHwgKCh5YXJnczogQXJndikgPT4gQXJndilcbiAgICB8IHtcbiAgICAgICAgW2xhYmVsOiBzdHJpbmddOiBhbnk7XG4gICAgICB9O1xuICBidWlsZGVyPzpcbiAgICB8ICgoeWFyZ3M6IEFyZ3YpID0+IEFyZ3YpXG4gICAgfCB7XG4gICAgICAgIFtsYWJlbDogc3RyaW5nXTogYW55O1xuICAgICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZUNvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHVibGljIHJlYWRvbmx5IGFic3RyYWN0IGNvbW1hbmQ6IENvbW1hbmRlckRlZnM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IEJhc2VDb21tYW5kT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5ydW4gPSB0aGlzLnJ1bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGlzdHJpYnV0aW9uIHBhdGggcmVnaXN0ZXJlZCBpbiB0aGUgdHNjb25maWcuanNvbiBmaWxlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldERpc3RyaWJ1dGlvblBhdGgoKSB7XG4gICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBkaXJlY3RvcnkgdXNpbmcgdHNjb25maWdcbiAgICBjb25zdCBjb25maWcgPSBhd2FpdCB0c0NvbmZpZygpO1xuICAgIHJldHVybiBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5vdXREaXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEVudHJ5cG9pbnQoeyBlbnYsIGVudHJ5cG9pbnQgfSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgc291cmNlRmlsZSA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBlbnRyeXBvaW50KTtcblxuICAgIGlmIChlbnYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gTG9hZCBkaXJlY3RseSBmcm9tIHNwZWNpZmllZCBlbnRyeXBvaW50IGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgIHJldHVybiBzb3VyY2VGaWxlO1xuICAgIH0gXG4gICAgXG4gICAgLy8gSW4gcHJvZHVjdGlvbiwgd2UgbmVlZCB0byBoYW5kbGUgVFMgZmlsZXNcbiAgICBpZiAoUGF0aC5leHRuYW1lKHNvdXJjZUZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgICAgY29uc3QgZGlzdHJpYnV0aW9uUGF0aCA9IGF3YWl0IHRoaXMuZ2V0RGlzdHJpYnV0aW9uUGF0aCgpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgdHJhbnNwaWxlZCBzb3VyY2VzIGRpcmVjdG9yeSBhbHJlYWR5IGV4aXN0c1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvblBhdGgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiQnVpbGRpbmcgdHlwZXNjcmlwdCBzb3VyY2UgaW50byBwbGFpbiBqYXZhc2NyaXB0IGZpbGVzLi4uXCIsIHsgZGlzdHJpYnV0aW9uUGF0aCB9KTtcbiAgICAgICAgYXdhaXQgZXhlYyhcInlhcm4gdHNjXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGZpbGUgZnJvbSBzcGVjaWZpZWQgc291cmNlXG4gICAgICBjb25zdCBmaWxlTmFtZSA9IFBhdGguYmFzZW5hbWUoc291cmNlRmlsZSwgXCIudHNcIik7XG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBQYXRoLnJlbGF0aXZlKHByb2Nlc3MuY3dkKCksIFBhdGguZGlybmFtZShzb3VyY2VGaWxlKSk7XG4gICAgICBsZXQgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGguam9pbihkaXN0cmlidXRpb25QYXRoLCByZWxhdGl2ZVBhdGgsIGAke2ZpbGVOYW1lfS5qc2ApO1xuXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgaW4gZGlzdHJpYnV0aW9uIHJvb3QsIGFzIGEgbGFzdCBhdHRlbXB0IHRvIG1ha2UgaXQgd29ya1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IFBhdGguYmFzZW5hbWUoc291cmNlRmlsZSwgXCIudHNcIik7XG4gICAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLmpvaW4oZGlzdHJpYnV0aW9uUGF0aCwgYCR7ZmlsZU5hbWV9LmpzYCk7XG5cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBDb3VsZCBub3QgZmluZCB0cmFuc3BpbGVkIGZpbGVcImApO1xuICAgICAgICAgIDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUnVucyBmcm9tIHRyYW5zcGlsZWQgZmlsZVxuICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGlzdHJpYnV0aW9uRmlsZTtcbiAgICB9XG4gICAgXG4gICAgLy8gRW50cnlwb2ludCBkb2Vzbid0IG5lZWQgdG8gYmUgdHJhbnNwaWxlZFxuICAgIHJldHVybiBzb3VyY2VGaWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IG1vZHVsZSBmcm9tIGl0cyByZWxhdGl2ZSBwYXRoIHRvIGN3ZCBhbmQgaW5pdGlhbGl6ZSBpdHMgaW5zdGFuY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgbG9hZChyZWxhdGl2ZVBhdGg6IHN0cmluZywgb3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBQcm9taXNlPFNlcnZlcj4ge1xuICAgIGNvbnN0IHBhdGhUb1NlcnZlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZVBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBNb2R1bGUgPSBhd2FpdCBpbXBvcnQocGF0aFRvU2VydmVyKTtcblxuICAgICAgaWYgKCFNb2R1bGUgfHwgIU1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6IFwiJHtleGNlcHRpb24ubWVzc2FnZX1cImApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIFlhcmdzIGluc3RhbmNlIHJlZ2lzdHJhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblByb2dyYW0oeWFyZ3M6IEFyZ3YpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIEJpbmQgY29tbWFuZCBhY3Rpb25cbiAgICBjb25zdCBoYW5kbGVyID0gYXN5bmMgYXJndiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5ydW4uYXBwbHkodGhpcywgW2FyZ3ZdKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihleGNlcHRpb24pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgMTAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBjb21tYW5kIGRlZmluaXRpb25cbiAgICByZXR1cm4geWFyZ3MuY29tbWFuZCh7XG4gICAgICBoYW5kbGVyLFxuICAgICAgY29tbWFuZDogdGhpcy5jb21tYW5kLnN5bnRheCxcbiAgICAgIGRlc2NyaWJlOiB0aGlzLmNvbW1hbmQuZGVzY3JpcHRpb24sXG4gICAgICBidWlsZGVyOiB0aGlzLmNvbW1hbmQuYnVpbGRlclxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBjb21tYW5kIHdoZW4gYXNrZWQgYnkgdGhlIENvbW1hbmQgTGluZSB3aXRoIHRoZSBhcmd2IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBydW4oYXJndjogYW55KTogUHJvbWlzZTx2b2lkPjtcbn1cbiJdfQ==