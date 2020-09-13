import { createUUID } from './uuid.js';
export class Style {
    constructor(css) {
        this.sheet = '';
        this.blocks = [];
        this.id = null;
        if (css)
            this.blocks.push(css);
        this.render();
    }
    render() {
        const css = document.createElement('style');
        this.id = `style-${createUUID()}`;
        css.id = this.id;
        if (this.blocks.length > 0)
            this.sheet += this.blocks[0];
        css.appendChild(document.createTextNode(this.sheet));
        document.getElementsByTagName('head')[0].appendChild(css);
    }
    rerender() {
        this.sheet = '';
        this.blocks.forEach(block => this.sheet += block);
        // @ts-ignore
        document.getElementById(this.id).childNodes[0].textContent = this.sheet;
    }
    add(block) {
        if (this.blocks.filter(cssBlock => cssBlock === block).length === 0)
            this.blocks.push(block);
        this.rerender();
    }
    remove(block) {
        this.blocks = this.blocks.filter(cssBlock => cssBlock !== block);
        this.render();
    }
}
export default Style;
//# sourceMappingURL=style.js.map