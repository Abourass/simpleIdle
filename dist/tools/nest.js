import el from './el.js';
import { createUUID } from './uuid.js';
export const nest = (tagName, appendTo, cb) => {
    const newEl = document.createElement(tagName);
    newEl.id = `${tagName}-${createUUID()}`;
    document.querySelector(appendTo)?.appendChild(newEl);
    cb(`#${newEl.id}`);
    return el(`#${newEl.id}`);
};
export default nest;
//# sourceMappingURL=nest.js.map