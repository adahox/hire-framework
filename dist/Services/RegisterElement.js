"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterElement {
    constructor(register) {
        this.template = document.createElement('template');
        this.build(register);
    }
    setTemplate(template) {
        this.template.innerHTML = template;
    }
    getTemplate() {
        return this.template;
    }
    static init(register) {
        new this(register);
    }
    build(register) {
        if (customElements.get(register.selector)) {
            throw new Error("Custom element already in use.");
        }
        class CustomElement extends HTMLElement {
            constructor() {
                super();
                const { template } = register;
                this.innerHTML = template;
            }
        }
        customElements.define(register.selector, CustomElement);
    }
}
exports.default = RegisterElement;
