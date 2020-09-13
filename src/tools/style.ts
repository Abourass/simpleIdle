import {createUUID} from './uuid.js';

export class Style {
  private sheet: string;
  private id: null | string;
  private blocks: any[];

  constructor(css?: string) {
    this.sheet = '';
    this.blocks = [];
    this.id = null;
    if (css) this.blocks.push(css);
    this.render();
  }

  render(): void {
    const css: HTMLStyleElement = document.createElement('style');
    this.id = `style-${createUUID()}`
    css.id = this.id;
    if (this.blocks.length > 0) this.sheet += this.blocks[0];
    css.appendChild(document.createTextNode(this.sheet))
    document.getElementsByTagName('head')[0].appendChild(css);
  }

  rerender(): void {
    this.sheet = '';
    this.blocks.forEach(block => this.sheet += block)
    // @ts-ignore
    document.getElementById(this.id).childNodes[0].textContent = this.sheet;
  }

  add(block: string): void {
    if (this.blocks.filter(cssBlock => cssBlock === block).length === 0) this.blocks.push(block);
    this.rerender()
  }

  remove(block: string): void {
    this.blocks = this.blocks.filter(cssBlock => cssBlock !== block);
    this.render();
  }
}
export default Style;
