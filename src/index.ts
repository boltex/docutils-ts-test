// All those import methods are equivalent

// import * as docutils from 'docutils-ts';

// import { get_language } from 'docutils-ts/languages';

import { core, languages } from 'docutils-ts';

const rst = `
My Header
=========

Some **bold** text and *italic* text.
`;

// const html = docutils.core.publish_string({ source: rst });
const html = core.publish_string({ source: rst });

console.log(html);

// const lang = get_language('fr');
// const lang = docutils.languages.get_language('fr');
let lang = languages.get_language('ja');
console.log(lang?.labels.note); // Should print the localized string for "note"
lang = languages.get_language('en');
console.log(lang?.labels.note); // Should print the localized string for "note"
lang = languages.get_language('ko');
console.log(lang?.labels.note); // Should print the localized string for "note"