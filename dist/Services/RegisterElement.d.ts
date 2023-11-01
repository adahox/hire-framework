interface IAttributes {
    name: string;
    default?: any;
}
interface IRegisterElementParams {
    selector: string;
    template: string;
    attributes?: IAttributes[];
}
export default class RegisterElement {
    private template;
    private constructor();
    private setTemplate;
    private getTemplate;
    static init(register: IRegisterElementParams): void;
    private build;
}
export {};
//# sourceMappingURL=RegisterElement.d.ts.map