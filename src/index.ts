import { writeFile } from 'fs/promises';
import * as docutils from 'docutils-ts';
import child_process from 'child_process';

// OK Test: Title underline detection issue
const rstTest1 = `
.. rst3: filename: test.html

#############
War and Peace
#############

Line one shorter, without blank line after
Line two much longer, **bold** text and *italic* text, that might be seen as underline

Proper paragraph after blank line.
`;

// OK Test: Title underline detection issue
const rstTest2 = `
.. rst3: filename: test.html

#############
War and Peace
#############

Line one longer this time, **bold** text and *italic* text without blank line after
Line two shorter that might be seen as underline

Proper paragraph after blank line.
`;

// OK Test: Title underline detection issue
const rstTest3 = `
.. rst3: filename: test.html

#############
War and Peace
#############

Line one with a blank line after

Line two that is separated by a blank line **bold** text and *italic* text

Proper paragraph after blank line.
`;

// BAD Test: Section and Title underline issues, also, false literal_block detection
const rstTest4 = `
.. rst3: filename: test.html

#############
War and Peace
#############

"Well, Prince, so Genoa and Lucca are now just family estates **bold** text and *italic* of the Buonapartes."
It was in July, 1805, and the speaker was the well-known Anna text Scherer.

Inner Section
+++++++++++++

Inner node content
`;

// BAD Test: Title underline detection issue, also, false literal_block detection
const rstTest5 = `
.. rst3: filename: test.html

#############
War and Peace
#############

"Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes."
It was in July, 1805, and the speaker was the well-known text Pavlovna Scherer.

Proper paragraph after **bold** text and *italic* blank line.
`;

// BAD Test: Consecutive paragraphs without blank lines, error: first-paragraph becomes a section title!
const rstTest6 = `
.. rst3: filename: test.html

#############
War and Peace
#############

First paragraph.
Second paragraph without **bold** text and *italic* text line.
Third paragraph.
`;

// OK Test: Section handling with varying blank lines 1
const rstTest7 = `
.. rst3: filename: test.html

#############
War and Peace
#############

Content before section.
Inner Section
+++++++++++++
Content after **bold** text and *italic* text title.
`;

// OK Test: Section handling with varying blank lines 2
const rstTest8 = `
.. rst3: filename: test.html

#############
War and Peace
#############

Content before section **bold** text and *italic* text.

Inner Section
+++++++++++++
Content after **bold** text and *italic* text title.
`;

// BAD Test: Simple period-ending line followed by other text
const rstTest9 = `
.. rst3: filename: test.html

#############
War and Peace
#############

This ends with a period.
This is a normal continuation line that should not be an underline **bold** text and *italic* text.

Proper paragraph after blank line.
`;

// OK Test: Simple non-period-ending line followed by other text
const rstTest10 = `
.. rst3: filename: test.html

#############
War and Peace
#############

This does not ends with a period
This is a normal continuation line that should not be an underline **bold** text and *italic* text

Proper paragraph after blank line
`;

// Test 
const rstTest11 = `
This is a paragraph::

    This is a literal block.
    It preserves spacing.
`;

// Test 
const rstTest12 = `
This is a paragraph::

This is a normal block.
and another line below it.
`;

// Test 
const rstTest13 = `
This is a paragraph

This is a normal block.
and another line below it.
`;

const rstTest14 = `
Here is Leo's main window on Windows 7 showing the outline pane (1), the body pane (2), the minibuffer (3), the log pane, showing the find tab (4).
The body pane shows the contents of the presently selected node in the outline pane:

.. image:: screen-shots/leo-main-window.png
   :scale: 40%
   :alt: Light Main Window

You can choose a dark theme:

.. image:: screen-shots/emacs-config.png
   :scale: 40%
   :alt: Dark Main Window
`;
const rstTest15 = `My File Header
==============

Some **bold** text and *italic* text in a file.`;

const rstTest16 = `Figure with caption and legend
------------------------------

.. _phase-diagram:

.. figure:: images/phase_diagram.svg
   :width: 70%
   :align: center

   Phase diagram of **H<sub>2</sub>O**.

   This diagram shows the regions of solid, liquid, and vapor for water.  
   The triple point is marked with a circle.
`;

const allTests = [
    // rstTest1, rstTest2, rstTest3, rstTest4, rstTest5, rstTest6, rstTest7, rstTest8, rstTest9, rstTest10,
    // rstTest11,
    // rstTest12,
    // rstTest13,
    // rstTest14,
    // rstTest15,
    rstTest16
];
// const allTests = [rstTest1];

let testCounter = 0;

for (const rst of allTests) {

    testCounter++;

    // const pseudoxml = await docutils.core.publish_string({ source: rst, writerName: 'pseudoxml' });
    // console.log('\nCalled publish_string\n');
    // await writeFile(`pseudo-ts${testCounter}.txt`, pseudoxml.toString());
    // console.log(`\nWrote PSEUDOXML to pseudo-ts${testCounter}.txt\n`);

    // const html = await docutils.core.publish_string({ source: rst, writerName: 'html' });
    // console.log('\nCalled publish_string\n');
    // await writeFile(`html-ts${testCounter}.html`, html.toString());
    // console.log(`\nWrote html to html-ts${testCounter}.html\n`);

    // const xml = await docutils.core.publish_string({ source: rst, writerName: 'xml' });
    // console.log('\nCalled publish_string\n');
    // await writeFile(`xml-ts${testCounter}.xml`, xml.toString());
    // console.log(`\nWrote xml to xml-ts${testCounter}.xml\n`);

    const pojo = await docutils.core.publish_string({ source: rst, writerName: 'pojo' });
    console.log('\nCalled publish_string\n');
    await writeFile(`pojo-ts${testCounter}.json`, pojo.toString());
    console.log(`\nWrote pojo to pojo-ts${testCounter}.json\n`);

    continue;

    // Write the rst to a file
    await writeFile(`myDocumentOriginal${testCounter}.txt`, rst);

    // Write the output to a file using docutils-ts
    const commandts = `rst2pseudoxml myDocumentOriginal${testCounter}.txt pseudo-ts${testCounter}.txt`;
    console.log(`Running commandts: ${commandts}\n`);
    child_process.execSync(commandts, { stdio: 'inherit' });

    // continue; // Only run the TypeScript docutils test, skip the Python part for now

    // Write the output to a file using Python docutils
    const command = `rst2pseudoxml.py myDocumentOriginal${testCounter}.txt pseudo-py${testCounter}.txt`;
    console.log(`Running command: ${command}\n`);
    child_process.execSync(command, { stdio: 'inherit' });

}

