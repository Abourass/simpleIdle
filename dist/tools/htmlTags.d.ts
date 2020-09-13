declare type basicHTMLTags = '!DOCTYPE' | 'html' | 'head' | 'title' | 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'br' | 'hr';
declare type formattingTags = 'abbr' | 'address' | 'b' | 'bdi' | 'bdo' | 'blockquote' | 'cite' | 'code' | 'del' | 'dfn' | 'em' | 'i' | 'ins' | 'kbd' | 'mark' | 'meter' | 'pre' | 'progress' | 's' | 'samp' | 'small' | 'strong' | 'sub' | 'sup' | 'template' | 'time' | 'u' | 'var' | 'wbr';
declare type inputTags = 'form' | 'input' | 'textarea' | 'button' | 'select' | 'optgroup' | 'option' | 'label' | 'fieldset' | 'legend' | 'datalist' | 'output';
declare type frameTags = 'iframe';
declare type imageTags = 'img' | 'map' | 'area' | 'canvas' | 'figcaption' | 'figure' | 'picture' | 'svg';
declare type audioVideoTags = 'audio' | 'source' | 'track' | 'video';
declare type linkTags = 'a' | 'link' | 'nav';
declare type listTags = 'ul' | 'ol' | 'li' | 'dl' | 'dt' | 'dd';
declare type tableTags = 'table' | 'caption' | 'th' | 'tr' | 'td' | 'thead' | 'tbody' | 'tfoot' | 'col' | 'colgroup';
declare type semanticTags = 'style' | 'div' | 'span' | 'header' | 'footer' | 'main' | 'section' | 'article' | 'aside' | 'details' | 'dialog' | 'summary' | 'data';
declare type metaTags = 'head' | 'meta' | 'base';
declare type programmingTags = 'script' | 'noscript' | 'embed' | 'object' | 'param';
export declare type htmlTags = basicHTMLTags | formattingTags | inputTags | frameTags | imageTags | audioVideoTags | linkTags | listTags | tableTags | semanticTags | metaTags | programmingTags;
export default htmlTags;
//# sourceMappingURL=htmlTags.d.ts.map