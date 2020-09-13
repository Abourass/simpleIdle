import el, {toolsInterface} from './el.js';
import {createUUID} from './uuid.js';
import htmlTags from './htmlTags';

export const nest = (tagName: htmlTags, appendTo: string, cb: (id: string) => void): toolsInterface => {
  const newEl: HTMLElement = document.createElement(tagName);
  newEl.id = `${tagName}-${createUUID()}`;
  document.querySelector(appendTo)?.appendChild(newEl);
  cb(`#${newEl.id}`);
  return el(`#${newEl.id}`);
};
export default nest;
