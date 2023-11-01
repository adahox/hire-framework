"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const validateTemplate = (selector) => {
    if (selector.length <= 0) {
        throw new Error('You need to pass a template for the element');
    }
};
const validateSelector = (selector) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const Component = (object) => (cls) => {
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
        this.addEventListener("click", cls.prototype.onClick || function () { });
        this.appendChild(clone);
    };
    window.customElements.define(object.selector, cls);
};
exports.Component = Component;
//# sourceMappingURL=Component.js.map