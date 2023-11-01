import { IModules } from "./Decorators/Modules";
import { IComponent } from "./Decorators/Component";
import  "./Decorators/Component";
import "./Decorators/Modules";

declare function Modules(config: IModules): any;
declare function Component(config: IComponent): any;

exports.module = Modules;
exports.module = Component;
