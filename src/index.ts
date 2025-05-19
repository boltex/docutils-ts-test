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
const html = await core.publish_string({
    source: rst,
    readerName: 'standalone',
    parserName: 'restructuredtext',
    writer: undefined,
    writerName: 'html',
});

console.log('Called publish_string: ', html);
console.log();

// const lang = get_language('fr');
// const lang = docutils.languages.get_language('fr');
console.log('Using get_language to output localized strings for "note":');

const getLanguage = languages.getLanguage;
// const get_language = languages.get_language;

let lang = getLanguage('ja');
console.log(lang?.labels.note); // Should print the localized string for "note"
lang = getLanguage('en');
console.log(lang?.labels.note); // Should print the localized string for "note"
lang = getLanguage('ko');
console.log(lang?.labels.note); // Should print the localized string for "note"