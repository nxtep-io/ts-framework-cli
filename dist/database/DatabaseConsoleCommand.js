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
const BaseCommand_1 = require("../BaseCommand");
class DatabaseCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "db:query <query>",
            description: "Runs database query using Server entrypoint",
            builder: yargs => {
                // yargs
                //   .boolean("e") 
                //   .alias("e", "entrypoint")
                //   .describe("d", "Starts server without production flags");
                return yargs;
            }
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Force production unless flag was supplied
            const port = options.port || this.options.port;
            const env = options.development ? "development" : "production";
            const distributionFile = yield this.getEntrypoint({ entrypoint, env });
            this.logger.debug(`Starting database in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            // Manually start the server lifecycle without listening to express port
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            yield instance.onInit();
            yield instance.onReady();
            // Find database instance
            const db = instance.components().find((component) => {
                // Check if component extends Database abstract class
                const parent = Object.getPrototypeOf(component.constructor);
                const base = Object.getPrototypeOf(parent);
                return base.name === 'Database';
            });
            if (!db) {
                this.logger.error('No database registered in the server instance');
                setTimeout(() => process.exit(-1), 1000);
                return;
            }
            if (db && db['connection']) {
                this.logger.info('Running database query', { query: options.query });
                console.log(yield db['connection'].query(options.query));
            }
            return;
        });
    }
}
exports.default = DatabaseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VDb25zb2xlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kYXRhYmFzZS9EYXRhYmFzZUNvbnNvbGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBd0M7QUFFeEMsTUFBcUIsZUFBZ0IsU0FBUSxxQkFBVTtJQUF2RDs7UUFDRSxZQUFPLEdBQUc7WUFDUixvQ0FBb0M7WUFDcEMsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixXQUFXLEVBQUUsNkNBQTZDO1lBQzFELE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDZixRQUFRO2dCQUNSLG1CQUFtQjtnQkFDbkIsOEJBQThCO2dCQUM5Qiw4REFBOEQ7Z0JBQzlELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUF3Q0osQ0FBQztJQXRDYyxHQUFHLENBQUMsRUFBb0Q7WUFBcEQsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQWMsRUFBWixvQ0FBVTs7WUFDakUsNENBQTRDO1lBQzVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFFL0QsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXhGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCx3RUFBd0U7WUFDeEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsSUFBSSxJQUFHLENBQUM7WUFDekUsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFekIseUJBQXlCO1lBQ3pCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEQscURBQXFEO2dCQUNyRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztnQkFDbkUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekMsT0FBTzthQUNSO1lBRUQsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDMUQ7WUFDRCxPQUFPOztLQUNSO0NBQ0Y7QUFwREQsa0NBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFJ1bkNvbW1hbmQgZnJvbSBcIi4uL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFiYXNlQ29tbWFuZCBleHRlbmRzIFJ1bkNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogXCJkYjpxdWVyeSA8cXVlcnk+XCIsXG4gICAgZGVzY3JpcHRpb246IFwiUnVucyBkYXRhYmFzZSBxdWVyeSB1c2luZyBTZXJ2ZXIgZW50cnlwb2ludFwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIC8vIHlhcmdzXG4gICAgICAvLyAgIC5ib29sZWFuKFwiZVwiKSBcbiAgICAgIC8vICAgLmFsaWFzKFwiZVwiLCBcImVudHJ5cG9pbnRcIilcbiAgICAgIC8vICAgLmRlc2NyaWJlKFwiZFwiLCBcIlN0YXJ0cyBzZXJ2ZXIgd2l0aG91dCBwcm9kdWN0aW9uIGZsYWdzXCIpO1xuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIHVubGVzcyBmbGFnIHdhcyBzdXBwbGllZFxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZW52ID0gb3B0aW9ucy5kZXZlbG9wbWVudCA/IFwiZGV2ZWxvcG1lbnRcIiA6IFwicHJvZHVjdGlvblwiO1xuXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMuZ2V0RW50cnlwb2ludCh7IGVudHJ5cG9pbnQsIGVudiB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgZGF0YWJhc2UgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICAvLyBNYW51YWxseSBzdGFydCB0aGUgc2VydmVyIGxpZmVjeWNsZSB3aXRob3V0IGxpc3RlbmluZyB0byBleHByZXNzIHBvcnRcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuXG4gICAgLy8gRmluZCBkYXRhYmFzZSBpbnN0YW5jZVxuICAgIGNvbnN0IGRiID0gaW5zdGFuY2UuY29tcG9uZW50cygpLmZpbmQoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgLy8gQ2hlY2sgaWYgY29tcG9uZW50IGV4dGVuZHMgRGF0YWJhc2UgYWJzdHJhY3QgY2xhc3NcbiAgICAgIGNvbnN0IHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb21wb25lbnQuY29uc3RydWN0b3IpO1xuICAgICAgY29uc3QgYmFzZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnQpO1xuICAgICAgcmV0dXJuIGJhc2UubmFtZSA9PT0gJ0RhdGFiYXNlJztcbiAgICB9KTtcblxuICAgIGlmICghZGIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdObyBkYXRhYmFzZSByZWdpc3RlcmVkIGluIHRoZSBzZXJ2ZXIgaW5zdGFuY2UnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KC0xKSwgMTAwMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRiICYmIGRiWydjb25uZWN0aW9uJ10pIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1J1bm5pbmcgZGF0YWJhc2UgcXVlcnknLCB7IHF1ZXJ5OiBvcHRpb25zLnF1ZXJ5IH0pO1xuICAgICAgY29uc29sZS5sb2coYXdhaXQgZGJbJ2Nvbm5lY3Rpb24nXS5xdWVyeShvcHRpb25zLnF1ZXJ5KSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxufVxuIl19