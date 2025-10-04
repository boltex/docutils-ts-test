#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
RST document processing tests
"""

import docutils.core
from pathlib import Path
# OK Test: Title underline detection issue
rstTest1 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

Line one shorter, without blank line after
Line two much longer, **bold** text and *italic* text, that might be seen as underline

Proper paragraph after blank line.
'''

# OK Test: Title underline detection issue
rstTest2 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

Line one longer this time, **bold** text and *italic* text without blank line after
Line two shorter that might be seen as underline

Proper paragraph after blank line.
'''

# OK Test: Title underline detection issue
rstTest3 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

Line one with a blank line after

Line two that is separated by a blank line **bold** text and *italic* text

Proper paragraph after blank line.
'''

# BAD Test: Section and Title underline issues, also, false literal_block detection
rstTest4 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

"Well, Prince, so Genoa and Lucca are now just family estates **bold** text and *italic* of the Buonapartes."
It was in July, 1805, and the speaker was the well-known Anna text Scherer.

Inner Section
+++++++++++++

Inner node content
'''

# BAD Test: Title underline detection issue, also, false literal_block detection
rstTest5 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

"Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes."
It was in July, 1805, and the speaker was the well-known text Pavlovna Scherer.

Proper paragraph after **bold** text and *italic* blank line.
'''

# BAD Test: Consecutive paragraphs without blank lines, error: first-paragraph becomes a section title!
rstTest6 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

First paragraph.
Second paragraph without **bold** text and *italic* text line.
Third paragraph.
'''

# OK Test: Section handling with varying blank lines 1
rstTest7 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

Content before section.
Inner Section
+++++++++++++
Content after **bold** text and *italic* text title.
'''

# OK Test: Section handling with varying blank lines 2
rstTest8 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

Content before section **bold** text and *italic* text.

Inner Section
+++++++++++++
Content after **bold** text and *italic* text title.
'''

# BAD Test: Simple period-ending line followed by other text
rstTest9 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

This ends with a period.
This is a normal continuation line that should not be an underline **bold** text and *italic* text.

Proper paragraph after blank line.
'''

# OK Test: Simple non-period-ending line followed by other text
rstTest10 = '''
.. rst3: filename: test.html

#############
War and Peace
#############

This does not ends with a period
This is a normal continuation line that should not be an underline **bold** text and *italic* text

Proper paragraph after blank line
'''


# Test 
rstTest11 = '''
This is a paragraph::

    This is a literal block.
    It preserves spacing.
'''

# Test 
rstTest12 = '''
This is a paragraph::

This is a normal block.
and another line below it.
'''

# Test 
rstTest13 = '''
This is a paragraph

This is a normal block.
and another line below it.
'''
# Test 
rstTest14 = '''
Here is Leo's main window on Windows 7 showing the outline pane (1), the body pane (2), the minibuffer (3), the log pane, showing the find tab (4).
The body pane shows the contents of the presently selected node in the outline pane:

.. image:: screen-shots/leo-main-window.png
   :scale: 40%
   :alt: Light Main Window

You can choose a dark theme:

.. image:: screen-shots/emacs-config.png
   :scale: 40%
   :alt: Dark Main Window
'''
# Test 
rstTest15 = '''My File Header
==============

Some **bold** text and *italic* text in a file.'''

rstTest16 = '''Figure with caption and legend
------------------------------

.. _phase-diagram:

.. figure:: images/phase_diagram.svg
   :width: 70%
   :align: center

   Phase diagram of **H<sub>2</sub>O**.

   This diagram shows the regions of solid, liquid, and vapor for water.  
   The triple point is marked with a circle.
'''

rstTest17 = '''.. contents::
   :depth: 2

Section One
===========

Subsection A
------------

Section Two
===========

Subsection B
------------
'''

rstTest18 = '''.. sectnum::

Section One
===========

Subsection A
------------
'''

rstTest19 = '''.. contents::
   :depth: 2
   :local:

.. sectnum::
   :depth: 2

Section One
===========

Subsection A
------------

Section Two
===========

Subsection B
------------
'''

rstTest20 = '''.. note::

   This is a simple note admonition.

.. admonition:: Reminder

   Don't forget to test transforms!
'''

rstTest21 = '''Here is a small code block::

    print("Hello, world!")

And some text after.
'''

rstTest22 = '''===============
Docutils Sample
===============

This is a minimal reStructuredText file showing code usage.

Inline code
===========

You can run ``python myscript.py`` to start the program.

Literal code block
==================

Here is a small code block::

    print("Hello, world!")

Code block directive
====================

.. code-block:: python

    for i in range(3):
        print(i)
'''

# allTests = [rstTest1, rstTest2, rstTest3, rstTest4, rstTest5, rstTest6, rstTest7, rstTest8, rstTest9, rstTest10, rstTest11, rstTest12, rstTest13, rstTest14, rstTest15]
# allTests = [rstTest17]        
allTests = [rstTest8, rstTest17]        # rstTest18, rstTest19, rstTest20, rstTest21, rstTest22

testCounter = 0

def write_file(filename, content):
    """Write content to a file"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    global testCounter
    for rst in allTests:
        testCounter += 1

        pseudoxml = docutils.core.publish_string(source=rst, writer_name='pseudoxml')
        print('\nCalled publish_string:\n')
        filename = f"pseudo-py{testCounter}.txt"
        write_file(filename, pseudoxml.decode('utf-8'))
        print(f'\nWrote PSEUDOXML to {filename}\n')

        html = docutils.core.publish_string(source=rst, writer_name='html')
        print('\nCalled publish_string:\n')
        filename = f"html-py{testCounter}.html"
        write_file(filename, html.decode('utf-8'))
        print(f'\nWrote html to {filename}\n')

      #   xml = docutils.core.publish_string(source=rst, writer_name='xml')
      #   print('\nCalled publish_string:\n')
      #   filename = f"xml-py{testCounter}.xml"
      #   write_file(filename, xml.decode('utf-8'))
      #   print(f'\nWrote xml to {filename}\n')

if __name__ == "__main__":
    main()
