"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const RegisterElement_1 = __importDefault(require("../Services/RegisterElement"));
class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    static handle(routes) {
        new this(routes);
    }
    init() {
        RegisterElement_1.default.init({
            selector: 'main-router',
            template: "<div id='router-handler-element'></div>"
        });
        window.addEventListener("hashchange", this.handleRouteChange.bind(this));
        window.addEventListener("load", this.handleRouteChange.bind(this));
    }
    handleRouteChange() {
        let currentRoute = window.location.hash;
        let route = this.routes.find((r) => r.route === currentRoute);
        console.log({
            current: currentRoute,
            route: route
        });
        route = route !== null && route !== void 0 ? route : this.routes.find((r) => r.route === '#/');
        console.log(route);
        if (route) {
            this.loadCustomElement(route.scene);
        }
        else {
            throw new Error('Route cannot be found');
        }
    }
    loadCustomElement(scene) {
        const routerContent = document.getElementById("router-handler-element");
        if (routerContent) {
            routerContent.innerHTML = '';
            routerContent.appendChild(new scene());
        }
    }
}
exports.Router = Router;
