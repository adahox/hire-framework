
interface ISceneDecorator {
    selector: string,
    templateUrl: string,
    style?: string,
    useShadow?: boolean,
    import?: any[]
}

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
}

const validateTemplate = (selector: string) => {
    if (selector.length <= 0) {
        throw new Error('You need to pass a template for the element');
    }
}

export const Scene = (scene: ISceneDecorator) => (cls: any) => {

    validateSelector(scene.selector);
    validateTemplate(scene.templateUrl);

    const template = document.createElement('template');

    if (scene.style) {
        scene.templateUrl = `
            <style>${scene.style}</style>
            ${scene.templateUrl}
        `;
    }

    template.innerHTML = scene.templateUrl;

    const connectedCallback = cls.prototype.connectedCallback || function () { };

    cls.prototype.connectedCallback = function () {
        const clone = document.importNode(template.content, true);

        scene.useShadow
            ? this.attachShadow({ mode: 'open' }).appendChild(clone)
            : this.appendChild(clone);

        connectedCallback.call(this);
    };

    /**
     * dependency injection for class
     */

    if (scene.import) {
        const dependenciesInstances = scene.import.map((dependency: any) => {
            if (typeof dependency === "function") {
                return new dependency();
            }
            return dependency;
        });
    }


    /**
     * register selector property
     */
    cls.prototype.selector = scene.selector;


    /**
     * register selector property
     */
    cls.prototype.template = document.importNode(template.content, true);


    /**
     * Register events for decorator / class
     */
    window.addEventListener("load", cls.prototype.onSceneLoad || function () { });

    /**
     * finally define custom element
     */
    window.customElements.define(scene.selector, cls);
} 