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
exports.default = GenerateCommand;
GenerateCommand.APP_COMPONENT = "app";
GenerateCommand.AVAILABLE_COMPOENENTS = [
    GenerateCommand.APP_COMPONENT,
    "controller",
    "service",
    "job",
    "model",
    "migration"
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0MsZ0RBQXlDO0FBU3pDLE1BQXFCLGVBQWdCLFNBQVEscUJBQVc7SUFzQ3RELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBckNqQixZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsd0JBQXdCO1lBQ2hDLFdBQVcsRUFBRSx3REFBd0Q7WUFDckUsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQztxQkFDMUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxzREFBc0QsQ0FBQyxDQUFDO2dCQUV6RSxLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsbUVBQW1FLENBQUMsQ0FBQztnQkFFdEYsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO3FCQUN0QixRQUFRLENBQUMsR0FBRyxFQUFFLDZFQUE2RSxDQUFDLENBQUM7Z0JBRWhHLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQztxQkFDeEIsUUFBUSxDQUFDLEdBQUcsRUFBRSwwRUFBMEUsQ0FBQyxDQUFDO1lBQy9GLENBQUM7U0FDRixDQUFDO1FBY0EsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVZLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBTzs7WUFDbkYsSUFBSSxlQUFlLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxJQUFJLCtCQUFTLENBQUMsMENBQTBDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDN0U7WUFFRCxpREFBaUQ7WUFDakQsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2xELE1BQU0sSUFBSSwrQkFBUyxDQUFDLHlCQUF5QixTQUFTLHVCQUF1QixDQUFDLENBQUM7YUFDaEY7WUFFRCxNQUFNLGFBQWEsR0FDakIsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMscUNBQXFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztZQUVwRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sSUFBSSxHQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztZQUV0RCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzdELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDO0tBQUE7O0FBeEVILGtDQXlFQztBQTdDZSw2QkFBYSxHQUFHLEtBQUssQ0FBQztBQUN0QixxQ0FBcUIsR0FBRztJQUNwQyxlQUFlLENBQUMsYUFBYTtJQUM3QixZQUFZO0lBQ1osU0FBUztJQUNULEtBQUs7SUFDTCxPQUFPO0lBQ1AsV0FBVztDQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIHNraXBJbnN0YWxsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBlbnY6IGFueTtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwibmV3IDxjb21wb25lbnQ+IFtuYW1lXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgYXBwbGljYXRpb24gb3IgY29tcG9uZW50LlwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKFwic1wiKVxuICAgICAgICAuYWxpYXMoXCJzXCIsIFwic2tpcC1pbnN0YWxsXCIpXG4gICAgICAgIC5kZXNjcmliZShcInNcIiwgXCJTa2lwcyB5YXJuIGluc3RhbGxhdGlvbiBhbmQgcG9zdCBnZW5lcmF0aW9uIHJvdXRpbmVzXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwicFwiKVxuICAgICAgICAuYWxpYXMoXCJwXCIsIFwicGF0aFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJwXCIsIFwiVGhlIGJhc2UgcGF0aCB0byBjcmVhdGUgdGhlIGZpbGUsIHJlbGF0aXZlIHRvIGN1cnJlbnQgd29ya2luZyBkaXJcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJiXCIpXG4gICAgICAgIC5hbGlhcyhcImJcIiwgXCJiYXNlLXVybFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJiXCIsIFwiVGhlIGJhc2UgVVJMIGZvciB0aGUgQ29udHJvbGxlciBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCIpO1xuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKFwidFwiKVxuICAgICAgICAuYWxpYXMoXCJ0XCIsIFwidGFibGUtbmFtZVwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJ0XCIsIFwiVGhlIHRhYmxlIG5hbWUgZm9yIHRoZSBNb2RlbCBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCIpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIEFQUF9DT01QT05FTlQgPSBcImFwcFwiO1xuICBwdWJsaWMgc3RhdGljIEFWQUlMQUJMRV9DT01QT0VORU5UUyA9IFtcbiAgICBHZW5lcmF0ZUNvbW1hbmQuQVBQX0NPTVBPTkVOVCwgXG4gICAgXCJjb250cm9sbGVyXCIsIFxuICAgIFwic2VydmljZVwiLCBcbiAgICBcImpvYlwiLCBcbiAgICBcIm1vZGVsXCIsIFxuICAgIFwibWlncmF0aW9uXCJcbiAgXTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmVudiA9IHllb21hbi5jcmVhdGVFbnYoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBjb21wb25lbnQsIG5hbWUsIHBhdGggPSBcIlwiLCBza2lwSW5zdGFsbCwgYmFzZVVybCwgdGFibGVOYW1lIH06IGFueSkge1xuICAgIGlmIChHZW5lcmF0ZUNvbW1hbmQuQVZBSUxBQkxFX0NPTVBPRU5FTlRTLmluZGV4T2YoY29tcG9uZW50KSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENvdWxkIG5vdCBnZW5lcmF0ZSB1bmtub3duIGNvbXBvbmVudDogXCIke2NvbXBvbmVudH1cImApO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBlbnRpdHkgbmFtZSB3YXMgcHJvdmlkZWQgZm9yIGNvbXBvbmVudHNcbiAgICBpZiAoKCFuYW1lIHx8ICFuYW1lLmxlbmd0aCkgJiYgY29tcG9uZW50ICE9PSBcImFwcFwiKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDYW5ub3Qgbm90IGdlbmVyYXRlIGEgJHtjb21wb25lbnR9IHdpdGhvdXQgYSB2YWxpZCBuYW1lYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdG9yTmFtZSA9XG4gICAgICBjb21wb25lbnQgIT09IFwiYXBwXCIgPyBgZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzLyR7Y29tcG9uZW50fWAgOiBcImdlbmVyYXRvci10cy1mcmFtZXdvcmtcIjtcblxuICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZShnZW5lcmF0b3JOYW1lKSwgYHRzLWZyYW1ld29ya2ApO1xuICAgIGNvbnN0IG9wdHM6IGFueSA9IHsgc2tpcEluc3RhbGwsIGJhc2VVcmwsIHRhYmxlTmFtZSB9O1xuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIG9wdHMucGF0aCA9IHBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLmVudi5ydW4oYHRzLWZyYW1ld29yayAke25hbWUgPyBuYW1lIDogXCJcIn1gLCBvcHRzLCBlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==