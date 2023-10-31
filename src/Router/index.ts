import RegisterElement from '../Services/RegisterElement';

interface IRouteElement {
    route: string,
    scene: any
}
type IRouteList = IRouteElement[]

export class Router {
    private routes: IRouteElement[];

    private constructor(routes: IRouteList) {
        this.routes = routes;
        this.init();
    }

    static handle(routes: IRouteList) {
        new this(routes);
    }

    private init() {

        /**
         * 
         * IT SHOULD USE Dependency Injection
         * 
         * Register new custom element <main-router></main-router>
         */
        RegisterElement.init({
            selector: 'main-router',
            template: "<div id='router-handler-element'></div>"
        });


        window.addEventListener("hashchange", this.handleRouteChange.bind(this));
        window.addEventListener("load", this.handleRouteChange.bind(this));
    }

    private handleRouteChange() {
        let  currentRoute = window.location.hash;
        let route = this.routes.find((r) => r.route === currentRoute);

        console.log({
            current: currentRoute,
            route: route
        })

        route = route ?? this.routes.find((r) => r.route === '#/');

        console.log(route);
        
        if (route) {
            this.loadCustomElement(route.scene);
        } else {
            throw new Error('Route cannot be found')
        }
    }

    private loadCustomElement(scene: any) {
        const routerContent = document.getElementById("router-handler-element");

        if (routerContent) {
            // filters clean
            routerContent.innerHTML = '';
            routerContent.appendChild(new scene());
        }

    }
}