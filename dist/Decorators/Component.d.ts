export interface IComponent {
    selector: string;
    templateUrl: string;
    style?: string;
    useShadow?: boolean;
}
export declare const Component: (object: IComponent) => (cls: any) => void;
//# sourceMappingURL=Component.d.ts.map