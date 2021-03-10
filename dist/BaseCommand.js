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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvQmFzZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLDZEQUF3RTtBQUV4RSxtQ0FBeUM7QUF3QnpDLE1BQThCLFdBQVc7SUFJdkMsWUFBbUIsVUFBOEIsRUFBRTtRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRztJQUNVLG1CQUFtQjs7WUFDOUIsa0RBQWtEO1lBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQVEsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxDQUFDO0tBQUE7SUFFWSxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFOztZQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUUzRCxJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7Z0JBQ3pCLDhEQUE4RDtnQkFDOUQsT0FBTyxVQUFVLENBQUM7YUFDbkI7WUFFRCw0Q0FBNEM7WUFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDdEMsa0RBQWtEO2dCQUNsRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLG1C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LENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDLENBQUEsQ0FBQztZQUVGLGtDQUFrQztZQUNsQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLE9BQU87Z0JBQ1AsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDNUIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztnQkFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzthQUM5QixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FNRjtBQWhIRCw4QkFnSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgU2VydmVyLCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IsIExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgQXJndiB9IGZyb20gXCJ5YXJnc1wiO1xuaW1wb3J0IHsgZXhlYywgdHNDb25maWcgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VDb21tYW5kT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBlbnRyeXBvaW50Pzogc3RyaW5nO1xuICBwb3J0Pzogc3RyaW5nIHwgbnVtYmVyO1xuICBlbnY/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZGVyRGVmcyB7XG4gIHN5bnRheDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBoYW5kbGVyPzpcbiAgICB8ICgoeWFyZ3M6IEFyZ3YpID0+IEFyZ3YpXG4gICAgfCB7XG4gICAgICAgIFtsYWJlbDogc3RyaW5nXTogYW55O1xuICAgICAgfTtcbiAgYnVpbGRlcj86XG4gICAgfCAoKHlhcmdzOiBBcmd2KSA9PiBBcmd2KVxuICAgIHwge1xuICAgICAgICBbbGFiZWw6IHN0cmluZ106IGFueTtcbiAgICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyByZWFkb25seSBhYnN0cmFjdCBjb21tYW5kOiBDb21tYW5kZXJEZWZzO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBCYXNlQ29tbWFuZE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMucnVuID0gdGhpcy5ydW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRpc3RyaWJ1dGlvbiBwYXRoIHJlZ2lzdGVyZWQgaW4gdGhlIHRzY29uZmlnLmpzb24gZmlsZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXREaXN0cmlidXRpb25QYXRoKCkge1xuICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZGlyZWN0b3J5IHVzaW5nIHRzY29uZmlnXG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgdHNDb25maWcoKTtcbiAgICByZXR1cm4gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5jb21waWxlck9wdGlvbnMub3V0RGlyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRFbnRyeXBvaW50KHsgZW52LCBlbnRyeXBvaW50IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICBpZiAoZW52ID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIC8vIExvYWQgZGlyZWN0bHkgZnJvbSBzcGVjaWZpZWQgZW50cnlwb2ludCBpbiBkZXZlbG9wbWVudCBtb2RlXG4gICAgICByZXR1cm4gc291cmNlRmlsZTtcbiAgICB9IFxuICAgIFxuICAgIC8vIEluIHByb2R1Y3Rpb24sIHdlIG5lZWQgdG8gaGFuZGxlIFRTIGZpbGVzXG4gICAgaWYgKFBhdGguZXh0bmFtZShzb3VyY2VGaWxlKSA9PT0gXCIudHNcIikge1xuICAgICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBkaXJlY3RvcnkgdXNpbmcgdHNjb25maWdcbiAgICAgIGNvbnN0IGRpc3RyaWJ1dGlvblBhdGggPSBhd2FpdCB0aGlzLmdldERpc3RyaWJ1dGlvblBhdGgoKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRyYW5zcGlsZWQgc291cmNlcyBkaXJlY3RvcnkgYWxyZWFkeSBleGlzdHNcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25QYXRoKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIkJ1aWxkaW5nIHR5cGVzY3JpcHQgc291cmNlIGludG8gcGxhaW4gamF2YXNjcmlwdCBmaWxlcy4uLlwiLCB7IGRpc3RyaWJ1dGlvblBhdGggfSk7XG4gICAgICAgIGF3YWl0IGV4ZWMoXCJ5YXJuIHRzY1wiKTtcbiAgICAgIH1cblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBmaWxlIGZyb20gc3BlY2lmaWVkIHNvdXJjZVxuICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gUGF0aC5yZWxhdGl2ZShwcm9jZXNzLmN3ZCgpLCBQYXRoLmRpcm5hbWUoc291cmNlRmlsZSkpO1xuICAgICAgbGV0IGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLmpvaW4oZGlzdHJpYnV0aW9uUGF0aCwgcmVsYXRpdmVQYXRoLCBgJHtmaWxlTmFtZX0uanNgKTtcblxuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgIC8vIFRyeSB0byBmaW5kIGluIGRpc3RyaWJ1dGlvbiByb290LCBhcyBhIGxhc3QgYXR0ZW1wdCB0byBtYWtlIGl0IHdvcmtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIGAke2ZpbGVOYW1lfS5qc2ApO1xuXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgICAgLy8gUnVucyBmcm9tIHRyYW5zcGlsZWQgZmlsZVxuICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgQ291bGQgbm90IGZpbmQgdHJhbnNwaWxlZCBmaWxlXCJgKTtcbiAgICAgICAgICAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpc3RyaWJ1dGlvbkZpbGU7XG4gICAgfVxuICAgIFxuICAgIC8vIEVudHJ5cG9pbnQgZG9lc24ndCBuZWVkIHRvIGJlIHRyYW5zcGlsZWRcbiAgICByZXR1cm4gc291cmNlRmlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBtb2R1bGUgZnJvbSBpdHMgcmVsYXRpdmUgcGF0aCB0byBjd2QgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiR7ZXhjZXB0aW9uLm1lc3NhZ2V9XCJgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBZYXJncyBpbnN0YW5jZSByZWdpc3RyYXRpb24uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25Qcm9ncmFtKHlhcmdzOiBBcmd2KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBCaW5kIGNvbW1hbmQgYWN0aW9uXG4gICAgY29uc3QgaGFuZGxlciA9IGFzeW5jIGFyZ3YgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucnVuLmFwcGx5KHRoaXMsIFthcmd2XSk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDEwMDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBSZWdpc3RlciB0aGUgY29tbWFuZCBkZWZpbml0aW9uXG4gICAgcmV0dXJuIHlhcmdzLmNvbW1hbmQoe1xuICAgICAgaGFuZGxlcixcbiAgICAgIGNvbW1hbmQ6IHRoaXMuY29tbWFuZC5zeW50YXgsXG4gICAgICBkZXNjcmliZTogdGhpcy5jb21tYW5kLmRlc2NyaXB0aW9uLFxuICAgICAgYnVpbGRlcjogdGhpcy5jb21tYW5kLmJ1aWxkZXJcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgY29tbWFuZCB3aGVuIGFza2VkIGJ5IHRoZSBDb21tYW5kIExpbmUgd2l0aCB0aGUgYXJndiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgcnVuKGFyZ3Y6IGFueSk6IFByb21pc2U8dm9pZD47XG59XG4iXX0=