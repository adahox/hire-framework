interface IModules {
    imports: any[],
    bootstrap?: any[]
}

export function Modules(config: IModules) {

    return function (target: any) {
        const originalConstructor = target;

        const newConstructor: any = function (...args: any[]) {
            const instance = new originalConstructor(...args);
            config.imports.forEach((dependency, index) => {
                if (typeof dependency === "function") {
                    instance[`dependency${index + 1}`] = new dependency();
                } else {
                    instance[`dependency${index + 1}`] = dependency;
                }
            });

            return instance;
        };

        newConstructor.prototype = originalConstructor.prototype;

        return newConstructor;
    };
}