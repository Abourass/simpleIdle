export const el = function (selector) {
    let element;
    const tools = {
        grab(tempSelector) {
            if (element)
                return element;
            return document.querySelector(tempSelector);
        },
        toggleClass(className) {
            element.classList.toggle(className);
            return this;
        },
        addClass(className) {
            if (Array.isArray(className)) {
                className.forEach((singleClass) => element.classList.add(singleClass));
            }
            else {
                element.classList.add(className);
            }
            return this;
        },
        removeClass(className) {
            if (Array.isArray(className)) {
                className.forEach((singleClass) => element.classList.remove(singleClass));
            }
            else {
                element.classList.remove(className);
            }
            return this;
        },
        hasClass(className) {
            return element.classList.contains(className);
        },
        replaceWith(string) {
            element.outerHTML = string;
            return this;
        },
        replaceWithElement(tagName, idForNewElement = null) {
            const newEl = document.createElement(tagName);
            const idToUse = idForNewElement || element.id;
            newEl.id = idToUse;
            element.parentNode?.replaceChild(newEl, element);
            return el(`#${idToUse}`);
        },
        html(htmlString) {
            element.innerHTML = htmlString;
            return this;
        },
        empty() {
            element.innerHTML = '';
            return this;
        },
        wrap(classForDiv) {
            const wrapper = document.createElement('div');
            wrapper.className = classForDiv;
            element.parentNode?.insertBefore(wrapper, element);
            element.parentNode?.removeChild(element);
            wrapper.appendChild(element);
            return this;
        },
        src(srcString) {
            const input = element;
            input.src = srcString;
            return this;
        },
        remove() {
            element.parentNode?.removeChild(element);
            return this;
        },
        set(setObj) {
            Object.keys(setObj).forEach((key) => {
                element.setAttribute(key, setObj[key]);
            });
            return this;
        },
        child(HTMLElement, insertAt = null) {
            if (insertAt === 'append' || insertAt == null) {
                element.append(HTMLElement);
            }
            if (insertAt === 'prepend') {
                element.prepend(HTMLElement);
            }
            return this;
        },
        children() {
            return element.childNodes;
        },
        text(txt) {
            element.textContent = txt.toString();
            return this;
        },
        textChild(string) {
            const textEl = document.createTextNode(string.toString());
            element.appendChild(textEl);
            return this;
        },
        type(type) {
            const input = element;
            input.type = type;
            return this;
        },
        name(name) {
            const input = element;
            input.name = name;
            return this;
        },
        input(type) {
            const input = element;
            input.name = element.id;
            input.type = type;
            return this;
        },
        htmlFor(elementTheLabelIsFor) {
            const label = element;
            label.htmlFor = elementTheLabelIsFor;
            return this;
        },
        id(idForEl = null) {
            if (idForEl) {
                element.id = idForEl;
                return this;
            }
            return element.id;
        },
        val(newVal = null) {
            const input = element;
            if (newVal == null)
                return input.value;
            input.value = newVal;
            return this;
        },
        data(dataSuffix) {
            return element.getAttribute(`data-${dataSuffix}`);
        },
        on(eventName, eventHandler) {
            element.addEventListener(eventName, eventHandler);
            return this;
        },
        off(eventName, eventHandler) {
            element.removeEventListener(eventName, eventHandler);
            return this;
        },
    };
    element = tools.grab(selector);
    return tools;
};
export default el;
//# sourceMappingURL=el.js.map