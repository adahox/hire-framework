"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
function Modules(config) {
    return function (target) {
        const originalConstructor = target;
        const newConstructor = function (...args) {
            const instance = new originalConstructor(...args);
            config.imports.forEach((dependency, index) => {
                if (typeof dependency === "function") {
                    instance[`dependency${index + 1}`] = new dependency();
                }
                else {
                    instance[`dependency${index + 1}`] = dependency;
                }
            });
            return instance;
        };
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
}
exports.Modules = Modules;
