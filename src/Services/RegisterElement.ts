interface IAttributes {
    name: string,
    default?: any
}
interface IRegisterElementParams {
    selector: string
    template: string
    attributes?: IAttributes[]
}

export default class RegisterElement {

    private template: HTMLTemplateElement = document.createElement('template');

    private constructor(register: IRegisterElementParams) {
        this.build(register);
    }

    private setTemplate(template: string) {
        this.template.innerHTML = template;
    }

    private getTemplate(): HTMLTemplateElement {
        return this.template;
    }

    static init(register: IRegisterElementParams) {
        new this(register)
    }

    private build(register: IRegisterElementParams) {

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