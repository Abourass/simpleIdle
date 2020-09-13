type basicHTMLTags = '!DOCTYPE' | 'html' | 'head' | 'title' | 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'br' | 'hr'
type formattingTags = 'abbr' | 'address' | 'b' | 'bdi' | 'bdo' | 'blockquote' | 'cite' | 'code' | 'del' | 'dfn' | 'em' | 'i' | 'ins' | 'kbd' | 'mark' | 'meter' | 'pre' | 'progress' | 's' | 'samp' | 'small' | 'strong' | 'sub' | 'sup' | 'template' | 'time' | 'u' | 'var' | 'wbr'
type inputTags = 'form' | 'input' | 'textarea' | 'button' | 'select' | 'optgroup' | 'option' | 'label' | 'fieldset' | 'legend' | 'datalist' | 'output'
type frameTags = 'iframe'
type imageTags = 'img' | 'map' | 'area' | 'canvas' | 'figcaption' | 'figure' | 'picture' | 'svg'
type audioVideoTags = 'audio' | 'source' | 'track' | 'video'
type linkTags = 'a' | 'link' | 'nav'
type listTags = 'ul' | 'ol' | 'li' | 'dl' | 'dt' | 'dd'
type tableTags = 'table' | 'caption' | 'th' | 'tr' | 'td' | 'thead' | 'tbody' | 'tfoot' | 'col' | 'colgroup'
type semanticTags = 'style' | 'div' | 'span' | 'header' | 'footer' | 'main' | 'section' | 'article' | 'aside' | 'details' | 'dialog' | 'summary' | 'data'
type metaTags = 'head' | 'meta' | 'base'
type programmingTags = 'script' | 'noscript' | 'embed' | 'object' | 'param'

export type htmlTags = basicHTMLTags | formattingTags | inputTags | frameTags | imageTags | audioVideoTags | linkTags | listTags | tableTags | semanticTags | metaTags | programmingTags;
export default htmlTags
