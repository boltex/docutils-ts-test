// All those import methods are equivalent

// import * as docutils from 'docutils-ts';
// import { getLanguage } from 'docutils-ts/languages';
import { core, languages } from 'docutils-ts';

const getLanguage = languages.getLanguage;

const rst = `
My Header
=========

Some **bold** text and *italic* text.
`;

// const html = await docutils.core.publish_string({ source: rst });

const html = await core.publish_string({
    source: rst,
    readerName: 'standalone',
    parserName: 'restructuredtext',
    writer: undefined,
    writerName: 'html',
});

console.log('\nCalled publish_string:\n');
console.log(html.toString());

console.log('Using getLanguage to output localized strings for "note":');

let lang = getLanguage('ja');
console.log(lang?.labels.note);

lang = getLanguage('en');
console.log(lang?.labels.note);

lang = getLanguage('ko');
console.log(lang?.labels.note);