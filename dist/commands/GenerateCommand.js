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
const ts_framework_common_1 = require("ts-framework-common");
const yeoman = require("yeoman-environment");
const BaseCommand_1 = require("../BaseCommand");
class GenerateCommand extends BaseCommand_1.default {
    constructor(options = {}) {
        super(options);
        this.command = {
            syntax: "new <component> [name]",
            description: "Generates a new TS Framework application or component.",
            builder: yargs => {
                yargs
                    .boolean("s")
                    .alias("s", "skip-install")
                    .describe("s", "Skips yarn installation and post generation routines");
                yargs
                    .string("p")
                    .alias("p", "path")
                    .describe("p", "The base path to create the file, relative to current working dir");
                yargs
                    .string("b")
                    .alias("b", "base-url")
                    .describe("b", "The base URL for the Controller generation, not applied to other components");
                yargs
                    .string("t")
                    .alias("t", "table-name")
                    .describe("t", "The table name for the Model generation, not applied to other components");
            }
        };
        this.env = yeoman.createEnv();
    }
    run({ component, name, path = "", skipInstall, baseUrl, tableName }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
                throw new ts_framework_common_1.BaseError(`Could not generate unknown component: "${component}"`);
            }
            // Ensure entity name was provided for components
            if ((!name || !name.length) && component !== "app") {
                throw new ts_framework_common_1.BaseError(`Cannot not generate a ${component} without a valid name`);
            }
            const generatorName = component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";
            this.env.register(require.resolve(generatorName), `ts-framework`);
            const opts = { skipInstall, baseUrl, tableName };
            if (path) {
                opts.path = path;
            }
            return new Promise((resolve, reject) => this.env.run(`ts-framework ${name ? name : ""}`, opts, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            }));
        });
    }
}
GenerateCommand.APP_COMPONENT = "app";
GenerateCommand.AVAILABLE_COMPOENENTS = [GenerateCommand.APP_COMPONENT, "controller", "service", "job", "model"];
exports.default = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELDZDQUE2QztBQUM3QyxnREFBeUM7QUFTekMsTUFBcUIsZUFBZ0IsU0FBUSxxQkFBVztJQStCdEQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUE5QmpCLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLHdEQUF3RDtZQUNyRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDO3FCQUMxQixRQUFRLENBQUMsR0FBRyxFQUFFLHNEQUFzRCxDQUFDLENBQUM7Z0JBRXpFLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxtRUFBbUUsQ0FBQyxDQUFDO2dCQUV0RixLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7cUJBQ3RCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsNkVBQTZFLENBQUMsQ0FBQztnQkFFaEcsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO3FCQUN4QixRQUFRLENBQUMsR0FBRyxFQUFFLDBFQUEwRSxDQUFDLENBQUM7WUFDL0YsQ0FBQztTQUNGLENBQUM7UUFPQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFPOztZQUNuRixJQUFJLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRSxNQUFNLElBQUksK0JBQVMsQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUM3RTtZQUVELGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDbEQsTUFBTSxJQUFJLCtCQUFTLENBQUMseUJBQXlCLFNBQVMsdUJBQXVCLENBQUMsQ0FBQzthQUNoRjtZQUVELE1BQU0sYUFBYSxHQUNqQixTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1lBRXBHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDbEUsTUFBTSxJQUFJLEdBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBRXRELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FBQTs7QUFyQ2EsNkJBQWEsR0FBRyxLQUFLLENBQUM7QUFDdEIscUNBQXFCLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBN0JqSCxrQ0FrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIHNraXBJbnN0YWxsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBlbnY6IGFueTtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwibmV3IDxjb21wb25lbnQ+IFtuYW1lXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgYXBwbGljYXRpb24gb3IgY29tcG9uZW50LlwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwic1wiKVxuICAgICAgICAuYWxpYXMoXCJzXCIsIFwic2tpcC1pbnN0YWxsXCIpXG4gICAgICAgIC5kZXNjcmliZShcInNcIiwgXCJTa2lwcyB5YXJuIGluc3RhbGxhdGlvbiBhbmQgcG9zdCBnZW5lcmF0aW9uIHJvdXRpbmVzXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwicFwiKVxuICAgICAgICAuYWxpYXMoXCJwXCIsIFwicGF0aFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJwXCIsIFwiVGhlIGJhc2UgcGF0aCB0byBjcmVhdGUgdGhlIGZpbGUsIHJlbGF0aXZlIHRvIGN1cnJlbnQgd29ya2luZyBkaXJcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJiXCIpXG4gICAgICAgIC5hbGlhcyhcImJcIiwgXCJiYXNlLXVybFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJiXCIsIFwiVGhlIGJhc2UgVVJMIGZvciB0aGUgQ29udHJvbGxlciBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwidFwiKVxuICAgICAgICAuYWxpYXMoXCJ0XCIsIFwidGFibGUtbmFtZVwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJ0XCIsIFwiVGhlIHRhYmxlIG5hbWUgZm9yIHRoZSBNb2RlbCBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCIpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIEFQUF9DT01QT05FTlQgPSBcImFwcFwiO1xuICBwdWJsaWMgc3RhdGljIEFWQUlMQUJMRV9DT01QT0VORU5UUyA9IFtHZW5lcmF0ZUNvbW1hbmQuQVBQX0NPTVBPTkVOVCwgXCJjb250cm9sbGVyXCIsIFwic2VydmljZVwiLCBcImpvYlwiLCBcIm1vZGVsXCJdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuZW52ID0geWVvbWFuLmNyZWF0ZUVudigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGNvbXBvbmVudCwgbmFtZSwgcGF0aCA9IFwiXCIsIHNraXBJbnN0YWxsLCBiYXNlVXJsLCB0YWJsZU5hbWUgfTogYW55KSB7XG4gICAgaWYgKEdlbmVyYXRlQ29tbWFuZC5BVkFJTEFCTEVfQ09NUE9FTkVOVFMuaW5kZXhPZihjb21wb25lbnQpIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGdlbmVyYXRlIHVua25vd24gY29tcG9uZW50OiBcIiR7Y29tcG9uZW50fVwiYCk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGVudGl0eSBuYW1lIHdhcyBwcm92aWRlZCBmb3IgY29tcG9uZW50c1xuICAgIGlmICgoIW5hbWUgfHwgIW5hbWUubGVuZ3RoKSAmJiBjb21wb25lbnQgIT09IFwiYXBwXCIpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENhbm5vdCBub3QgZ2VuZXJhdGUgYSAke2NvbXBvbmVudH0gd2l0aG91dCBhIHZhbGlkIG5hbWVgKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZW5lcmF0b3JOYW1lID1cbiAgICAgIGNvbXBvbmVudCAhPT0gXCJhcHBcIiA/IGBnZW5lcmF0b3ItdHMtZnJhbWV3b3JrL2dlbmVyYXRvcnMvJHtjb21wb25lbnR9YCA6IFwiZ2VuZXJhdG9yLXRzLWZyYW1ld29ya1wiO1xuXG4gICAgdGhpcy5lbnYucmVnaXN0ZXIocmVxdWlyZS5yZXNvbHZlKGdlbmVyYXRvck5hbWUpLCBgdHMtZnJhbWV3b3JrYCk7XG4gICAgY29uc3Qgb3B0czogYW55ID0geyBza2lwSW5zdGFsbCwgYmFzZVVybCwgdGFibGVOYW1lIH07XG5cbiAgICBpZiAocGF0aCkge1xuICAgICAgb3B0cy5wYXRoID0gcGF0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHRoaXMuZW52LnJ1bihgdHMtZnJhbWV3b3JrICR7bmFtZSA/IG5hbWUgOiBcIlwifWAsIG9wdHMsIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19