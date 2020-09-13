import Style from "./style.js";
export declare const tools: {
    create: (tagName: import("./htmlTags.js").htmlTags, appendTo: string) => import("./el.js").toolsInterface;
    el: (selector: string) => import("./el.js").toolsInterface;
    nest: (tagName: import("./htmlTags.js").htmlTags, appendTo: string, cb: (id: string) => void) => import("./el.js").toolsInterface;
    Style: typeof Style;
};
export default tools;
//# sourceMappingURL=index.d.ts.map