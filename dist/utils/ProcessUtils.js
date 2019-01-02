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
const child_process_1 = require("child_process");
/**
 * Simple method for executing child processes.
 */
exports.exec = function exec(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            child_process_1.exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    this.logger.error(stdout);
                    this.logger.error(stderr);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvY2Vzc1V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWxzL1Byb2Nlc3NVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQTZDO0FBRTdDOztHQUVHO0FBQ1UsUUFBQSxJQUFJLEdBQUcsU0FBZSxJQUFJLENBQUMsR0FBRzs7UUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxvQkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtvQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIGFzIEV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG4vKipcbiAqIFNpbXBsZSBtZXRob2QgZm9yIGV4ZWN1dGluZyBjaGlsZCBwcm9jZXNzZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBleGVjID0gYXN5bmMgZnVuY3Rpb24gZXhlYyhjbWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBFeGVjKGNtZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgaWYgKGVycm9yIHx8IHN0ZGVycikge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRvdXQpO1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRlcnIpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=