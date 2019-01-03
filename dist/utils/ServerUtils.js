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
exports.getDatabases = (server) => __awaiter(this, void 0, void 0, function* () {
    // TODO: This should be recursive
    return server.components().filter(component => {
        // Check if component extends Database abstract class
        const parent = Object.getPrototypeOf(component.constructor);
        const base = Object.getPrototypeOf(parent);
        return base.name === 'Database';
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdXRpbHMvU2VydmVyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdhLFFBQUEsWUFBWSxHQUFHLENBQU8sTUFBYyxFQUF1QixFQUFFO0lBQ3RFLGlDQUFpQztJQUNqQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDNUMscURBQXFEO1FBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztJQUNsQyxDQUFDLENBQWUsQ0FBQztBQUNyQixDQUFDLENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXIgZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuXG5leHBvcnQgY29uc3QgZ2V0RGF0YWJhc2VzID0gYXN5bmMgKHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTxEYXRhYmFzZVtdPiA9PiB7XG4gICAgLy8gVE9ETzogVGhpcyBzaG91bGQgYmUgcmVjdXJzaXZlXG4gICAgcmV0dXJuIHNlcnZlci5jb21wb25lbnRzKCkuZmlsdGVyKGNvbXBvbmVudCA9PiB7XG4gICAgICAvLyBDaGVjayBpZiBjb21wb25lbnQgZXh0ZW5kcyBEYXRhYmFzZSBhYnN0cmFjdCBjbGFzc1xuICAgICAgY29uc3QgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNvbXBvbmVudC5jb25zdHJ1Y3Rvcik7XG4gICAgICBjb25zdCBiYXNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gICAgICByZXR1cm4gYmFzZS5uYW1lID09PSAnRGF0YWJhc2UnO1xuICAgIH0pIGFzIERhdGFiYXNlW107XG59Il19