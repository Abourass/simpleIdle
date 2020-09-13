export declare interface toolsInterface {
    grab(tempSelector: string): Element;
    toggleClass(className: string): toolsInterface;
    addClass(className: (string[] | string)): toolsInterface;
    removeClass(className: (string[] | string)): toolsInterface;
    hasClass(className: string): boolean;
    replaceWith(string: string): toolsInterface;
    replaceWithElement(tagName: string, idForNewElement?: (string | null)): toolsInterface;
    html(htmlString: string): toolsInterface;
    empty(): toolsInterface;
    wrap(classForDiv: string): toolsInterface;
    src(srcString: string): toolsInterface;
    type(type: string): toolsInterface;
    input(type: string): toolsInterface;
    name(name: string): toolsInterface;
    htmlFor(elementTheLabelIsFor: string): toolsInterface;
    val(newVal?: (string | null)): (string | undefined | toolsInterface);
    remove(): toolsInterface;
    set(setObj: Object): toolsInterface;
    child(HTMLElement: HTMLElement, insertAt?: ("append" | "prepend" | null)): toolsInterface;
    children(): NodeListOf<ChildNode>;
    text(txt: string | Array<any> | Object | number): toolsInterface;
    textChild(string: string | Array<any> | Object | number): toolsInterface;
    data(dataSuffix: string): string;
    id(idForEl?: string): string | toolsInterface;
    on(eventName: string, eventHandler: (event: any, opt?: any, opt2?: any, opt3?: any) => void): toolsInterface;
    off(eventName: string, eventHandler: (event: any, opt?: any, opt2?: any, opt3?: any) => void): toolsInterface;
}
export declare const el: (selector: string) => toolsInterface;
export default el;
//# sourceMappingURL=el.d.ts.map