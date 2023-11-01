"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const validateSelector = (selector) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const validateTemplate = (selector) => {
    if (selector.length <= 0) {
        throw new Error('You need to pass a template for the element');
    }
};
const Scene = (scene) => (cls) => {
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
    if (scene.import) {
        const dependenciesInstances = scene.import.map((dependency) => {
            if (typeof dependency === "function") {
                return new dependency();
            }
            return dependency;
        });
    }
    cls.prototype.selector = scene.selector;
    cls.prototype.template = document.importNode(template.content, true);
    window.addEventListener("load", cls.prototype.onSceneLoad || function () { });
    window.customElements.define(scene.selector, cls);
};
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map