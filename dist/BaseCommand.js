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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQmFzZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0IsNkRBQXdFO0FBRXhFLG1DQUF5QztBQXdCekMsTUFBOEIsV0FBVztJQUl2QyxZQUFtQixVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ1UsbUJBQW1COztZQUM5QixrREFBa0Q7WUFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBUSxFQUFFLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FBQTtJQUVZLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7O1lBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTNELElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsOERBQThEO2dCQUM5RCxPQUFPLFVBQVUsQ0FBQzthQUNuQjtZQUVELDRDQUE0QztZQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN0QyxrREFBa0Q7Z0JBQ2xELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFFMUQsMkRBQTJEO2dCQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDckcsTUFBTSxZQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3hCO2dCQUVELG9EQUFvRDtnQkFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxHQUFHLFFBQVEsS0FBSyxDQUFDLENBQUM7Z0JBRW5GLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3BDLHNFQUFzRTtvQkFDdEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2xELGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDO29CQUVqRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTt3QkFDbkMsNEJBQTRCO3dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO3FCQUN6RTt5QkFBTTt3QkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3FCQUV4RDtpQkFDRjtxQkFBTTtvQkFDTCw0QkFBNEI7b0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLCtCQUErQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7aUJBQ3pFO2dCQUVELE9BQU8sZ0JBQWdCLENBQUM7YUFDekI7WUFFRCwyQ0FBMkM7WUFDM0MsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDYSxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUF1Qjs7WUFDaEUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRywyQ0FBYSxZQUFZLEVBQUMsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekIsTUFBTSxJQUFJLCtCQUFTLENBQUMsb0NBQW9DLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQy9FO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxTQUFTLENBQUMsS0FBVzs7WUFDaEMsc0JBQXNCO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLENBQU0sSUFBSSxFQUFDLEVBQUU7Z0JBQzNCLElBQUk7b0JBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzNDO2dCQUFDLE9BQU8sU0FBUyxFQUFFO29CQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3pDO1lBQ0gsQ0FBQyxDQUFBLENBQUM7WUFFRixrQ0FBa0M7WUFDbEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNuQixPQUFPO2dCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDOUIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBTUY7QUFoSEQsOEJBZ0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFNlcnZlciwgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgQmFzZUVycm9yLCBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEFyZ3YgfSBmcm9tIFwieWFyZ3NcIjtcbmltcG9ydCB7IGV4ZWMsIHRzQ29uZmlnIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlQ29tbWFuZE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgZW50cnlwb2ludD86IHN0cmluZztcbiAgcG9ydD86IHN0cmluZyB8IG51bWJlcjtcbiAgZW52Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRlckRlZnMge1xuICBzeW50YXg6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaGFuZGxlcj86XG4gICAgfCAoKHlhcmdzOiBBcmd2KSA9PiBBcmd2KVxuICAgIHwge1xuICAgICAgICBbbGFiZWw6IHN0cmluZ106IGFueTtcbiAgICAgIH07XG4gIGJ1aWxkZXI/OlxuICAgIHwgKCh5YXJnczogQXJndikgPT4gQXJndilcbiAgICB8IHtcbiAgICAgICAgW2xhYmVsOiBzdHJpbmddOiBhbnk7XG4gICAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29tbWFuZCB7XG4gIHB1YmxpYyByZWFkb25seSBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgcmVhZG9ubHkgYWJzdHJhY3QgY29tbWFuZDogQ29tbWFuZGVyRGVmcztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogQmFzZUNvbW1hbmRPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJ1biA9IHRoaXMucnVuLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkaXN0cmlidXRpb24gcGF0aCByZWdpc3RlcmVkIGluIHRoZSB0c2NvbmZpZy5qc29uIGZpbGUuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RGlzdHJpYnV0aW9uUGF0aCgpIHtcbiAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IHRzQ29uZmlnKCk7XG4gICAgcmV0dXJuIFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuY29tcGlsZXJPcHRpb25zLm91dERpcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RW50cnlwb2ludCh7IGVudiwgZW50cnlwb2ludCB9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzb3VyY2VGaWxlID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGVudHJ5cG9pbnQpO1xuXG4gICAgaWYgKGVudiA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBMb2FkIGRpcmVjdGx5IGZyb20gc3BlY2lmaWVkIGVudHJ5cG9pbnQgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuICAgICAgcmV0dXJuIHNvdXJjZUZpbGU7XG4gICAgfSBcbiAgICBcbiAgICAvLyBJbiBwcm9kdWN0aW9uLCB3ZSBuZWVkIHRvIGhhbmRsZSBUUyBmaWxlc1xuICAgIGlmIChQYXRoLmV4dG5hbWUoc291cmNlRmlsZSkgPT09IFwiLnRzXCIpIHtcbiAgICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZGlyZWN0b3J5IHVzaW5nIHRzY29uZmlnXG4gICAgICBjb25zdCBkaXN0cmlidXRpb25QYXRoID0gYXdhaXQgdGhpcy5nZXREaXN0cmlidXRpb25QYXRoKCk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSB0cmFuc3BpbGVkIHNvdXJjZXMgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uUGF0aCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJCdWlsZGluZyB0eXBlc2NyaXB0IHNvdXJjZSBpbnRvIHBsYWluIGphdmFzY3JpcHQgZmlsZXMuLi5cIiwgeyBkaXN0cmlidXRpb25QYXRoIH0pO1xuICAgICAgICBhd2FpdCBleGVjKFwieWFybiB0c2NcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZmlsZSBmcm9tIHNwZWNpZmllZCBzb3VyY2VcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCBcIi50c1wiKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IFBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgUGF0aC5kaXJuYW1lKHNvdXJjZUZpbGUpKTtcbiAgICAgIGxldCBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIHJlbGF0aXZlUGF0aCwgYCR7ZmlsZU5hbWV9LmpzYCk7XG5cbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBpbiBkaXN0cmlidXRpb24gcm9vdCwgYXMgYSBsYXN0IGF0dGVtcHQgdG8gbWFrZSBpdCB3b3JrXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCBcIi50c1wiKTtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGguam9pbihkaXN0cmlidXRpb25QYXRoLCBgJHtmaWxlTmFtZX0uanNgKTtcblxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYENvdWxkIG5vdCBmaW5kIHRyYW5zcGlsZWQgZmlsZVwiYCk7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpc3RyaWJ1dGlvbkZpbGU7XG4gICAgfVxuICAgIFxuICAgIC8vIEVudHJ5cG9pbnQgZG9lc24ndCBuZWVkIHRvIGJlIHRyYW5zcGlsZWRcbiAgICByZXR1cm4gc291cmNlRmlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBtb2R1bGUgZnJvbSBpdHMgcmVsYXRpdmUgcGF0aCB0byBjd2QgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiR7ZXhjZXB0aW9uLm1lc3NhZ2V9XCJgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBZYXJncyBpbnN0YW5jZSByZWdpc3RyYXRpb24uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25Qcm9ncmFtKHlhcmdzOiBBcmd2KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBCaW5kIGNvbW1hbmQgYWN0aW9uXG4gICAgY29uc3QgaGFuZGxlciA9IGFzeW5jIGFyZ3YgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucnVuLmFwcGx5KHRoaXMsIFthcmd2XSk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDEwMDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBSZWdpc3RlciB0aGUgY29tbWFuZCBkZWZpbml0aW9uXG4gICAgcmV0dXJuIHlhcmdzLmNvbW1hbmQoe1xuICAgICAgaGFuZGxlcixcbiAgICAgIGNvbW1hbmQ6IHRoaXMuY29tbWFuZC5zeW50YXgsXG4gICAgICBkZXNjcmliZTogdGhpcy5jb21tYW5kLmRlc2NyaXB0aW9uLFxuICAgICAgYnVpbGRlcjogdGhpcy5jb21tYW5kLmJ1aWxkZXJcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgY29tbWFuZCB3aGVuIGFza2VkIGJ5IHRoZSBDb21tYW5kIExpbmUgd2l0aCB0aGUgYXJndiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgcnVuKGFyZ3Y6IGFueSk6IFByb21pc2U8dm9pZD47XG59XG4iXX0=