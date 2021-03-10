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
exports.exec = void 0;
const child_process_1 = require("child_process");
/**
 * Simple method for executing child processes.
 */
const exec = function exec(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            child_process_1.exec(cmd, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject(error);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    });
};
exports.exec = exec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvY2Vzc1V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWxzL1Byb2Nlc3NVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBNkM7QUFFN0M7O0dBRUc7QUFDSSxNQUFNLElBQUksR0FBRyxTQUFlLElBQUksQ0FBQyxHQUFHOztRQUN6QyxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLG9CQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO29CQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUEsQ0FBQztBQVZXLFFBQUEsSUFBSSxRQVVmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyBhcyBFeGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLyoqXG4gKiBTaW1wbGUgbWV0aG9kIGZvciBleGVjdXRpbmcgY2hpbGQgcHJvY2Vzc2VzLlxuICovXG5leHBvcnQgY29uc3QgZXhlYyA9IGFzeW5jIGZ1bmN0aW9uIGV4ZWMoY21kKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBFeGVjKGNtZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgaWYgKGVycm9yIHx8IHN0ZGVycikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShzdGRvdXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=