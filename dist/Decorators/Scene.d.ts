interface ISceneDecorator {
    selector: string;
    templateUrl: string;
    style?: string;
    useShadow?: boolean;
    import?: any[];
}
export declare const Scene: (scene: ISceneDecorator) => (cls: any) => void;
export {};
//# sourceMappingURL=Scene.d.ts.map