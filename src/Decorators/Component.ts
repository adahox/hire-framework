export interface IComponent {
    selector: string,
    templateUrl: string,
    style?: string,
    useShadow?: boolean
}

const validateTemplate = (selector: string) => {
    if (selector.length <= 0) {
        throw new Error('You need to pass a template for the element');
    }
}

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
}

export const Component = (object: IComponent) => (cls: any) => {
    validateSelector(object.selector);
    validateTemplate(object.templateUrl);

    const template = document.createElement('template');

    if (object.style) {
        object.templateUrl = `
            <style>${object.style}</style>
            ${object.templateUrl}
        `;
    }

    template.innerHTML = object.templateUrl;

    cls.prototype.connectedCallback = function () {
        const clone = document.importNode(template.content, true);    
        this.addEventListener("click", cls.prototype.onClick || function () {});
        this.appendChild(clone);
    };

    window.customElements.define(object.selector, cls);
} 