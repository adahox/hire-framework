interface IRouteElement {
    route: string;
    scene: any;
}
type IRouteList = IRouteElement[];
export declare class Router {
    private routes;
    private constructor();
    static handle(routes: IRouteList): void;
    private init;
    private handleRouteChange;
    private loadCustomElement;
}
export {};
//# sourceMappingURL=index.d.ts.map