import el from './el.js';
import { createUUID } from './uuid.js';
export const create = function (tagName, appendTo) {
    const newEl = document.createElement(tagName);
    newEl.id = `${tagName}-${createUUID()}`;
    document.querySelector(appendTo)?.appendChild(newEl);
    return el(`#${newEl.id}`);
};
export default create;
//# sourceMappingURL=create.js.map