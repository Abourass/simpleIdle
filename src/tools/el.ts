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
  id(idForEl?: string): string | toolsInterface
  on(eventName: string, eventHandler: (event: any, opt?: any, opt2?: any, opt3?: any) => void): toolsInterface
  off(eventName: string, eventHandler: (event: any, opt?: any, opt2?: any, opt3?: any) => void): toolsInterface;
}

export const el = function(selector: string){
  let element: Element;
  const tools: toolsInterface = {
    grab(tempSelector: string): Element {
      if (element) return element;
      return <Element>document.querySelector(tempSelector);
    },
    toggleClass(className: string): toolsInterface {
      element.classList.toggle(className);
      return this;
    },
    addClass(className: string[] | string): toolsInterface {
      if (Array.isArray(className)){
        className.forEach((singleClass: string): void => element.classList.add(singleClass));
      } else {
        element.classList.add(className);
      }
      return this;
    },
    removeClass(className: string[] | string): toolsInterface {
      if (Array.isArray(className)){
        className.forEach((singleClass: string): void => element.classList.remove(singleClass));
      } else {
        element.classList.remove(className);
      }
      return this;
    },
    hasClass(className: string): boolean {
      return element.classList.contains(className);
    },
    replaceWith(string: string): toolsInterface {
      element.outerHTML = string;
      return this;
    },
    replaceWithElement(tagName: string, idForNewElement: string | null = null): toolsInterface {
      const newEl: HTMLElement = document.createElement(tagName);
      const idToUse: string = idForNewElement || element.id;
      newEl.id = idToUse;
      element.parentNode?.replaceChild(newEl, element);
      return el(`#${idToUse}`);
    },
    html(htmlString: string): toolsInterface {
      element.innerHTML = htmlString;
      return this;
    },
    empty(): toolsInterface {
      element.innerHTML = '';
      return this;
    },
    wrap(classForDiv: string): toolsInterface{
      const wrapper: HTMLDivElement = document.createElement('div');
      wrapper.className = classForDiv;
      element.parentNode?.insertBefore(wrapper, element);
      element.parentNode?.removeChild(element);
      wrapper.appendChild(element);
      return this
    },
    src(srcString: string): toolsInterface {
      const input: Partial<HTMLInputElement> = element
      input.src = srcString;
      return this;
    },
    remove(): toolsInterface {
      element.parentNode?.removeChild(element);
      return this;
    },
    set(setObj: Object): toolsInterface {
      Object.keys(setObj).forEach((key: string): void => {
        element.setAttribute(key, setObj[key as keyof typeof setObj] as any);
      });
      return this;
    },
    child(HTMLElement: HTMLElement, insertAt: 'append' | 'prepend' | null = null): toolsInterface {
      if (insertAt === 'append' || insertAt == null) { element.append(HTMLElement); }
      if (insertAt === 'prepend'){ element.prepend(HTMLElement); }
      return this;
    },
    children(): NodeListOf<ChildNode> {
      return element.childNodes;
    },
    text(txt: string | Array<any> | Object | number): toolsInterface {
      element.textContent = txt.toString();
      return this;
    },
    textChild(string: string | Array<any> | Object | number): toolsInterface {
      const textEl: Text = document.createTextNode(string.toString());
      element.appendChild(textEl);
      return this;
    },
    type(type: string): toolsInterface {
      const input: Partial<HTMLInputElement> = element
      input.type = type;
      return this;
    },
    name(name: string): toolsInterface {
      const input: Partial<HTMLInputElement> = element
      input.name = name;
      return this;
    },
    input(type: string): toolsInterface {
      const input: Partial<HTMLInputElement> = element
      input.name = element.id;
      input.type = type;
      return this;
    },
    htmlFor(elementTheLabelIsFor: string): toolsInterface {
      const label: Partial<HTMLLabelElement> = element
      label.htmlFor = elementTheLabelIsFor;
      return this;
    },
    id(idForEl: string | null = null): toolsInterface | string {
      if (idForEl){
        element.id = idForEl
        return this
      }
      return element.id;
    },
    val(newVal: null | string = null): string | undefined | toolsInterface{
      const input: Partial<HTMLInputElement> = element
      if (newVal == null)  return input.value;
      input.value = newVal;
      return this;
    },
    data(dataSuffix: string): string {
      return <string>element.getAttribute(`data-${dataSuffix}`);
    },
    on(eventName: string, eventHandler: (event: any, opt?: any, opt2?: any, opt3?: any) => void): toolsInterface {
      element.addEventListener(eventName, eventHandler);
      return this;
    },
    off(eventName: string, eventHandler: (event: any, opt?: any, opt2?: any, opt3?: any) => void): toolsInterface {
      element.removeEventListener(eventName, eventHandler);
      return this;
    },
  };
  element = tools.grab(selector);
  return tools;
}
export default el;
