# Sources

The `Sources` tab is one of the most powerful tabs when it comes to debugging your code. This
tab lets you pause code execution at arbitrary points, dive in to see what value each variable
has at that point, and view the entire callstack history at any given point.

## Inspecting Individual Files

The `Sources` tab organizes files first by domain, and then by directory structure, creating a tree. In the example below, we first opened up the [democompany.com](https://democompany.com) source tree, and then opened each nested folder to reveal all of the files within. Clickin on an individual file will pull up the code for that file in the area next to the tree.

{{viewing-files}}

## Pretty Printing Source

A lot of times when you're dealing with production code that's live it will be minified for performance reasons. To help with this, the area where the code appears has a button that looks like an open and close brace `{}`. This button will attempt to neatly print any minified code. Note that this only fixes the spacing of the minified file, if you have an advanced minifier that replaces variable names as well this will not help with that.

{{pretty-printing}}

## Adding &amp; Using Breakpoints

Breakpoints allow you to pause the execution of code anywhere you like. By clicking on the line number of the line you would like to break on, your code will pause there until you click the continue button. Note that breakpoints are *exclusive*, meaning that the line that you place your breakpoint on will *NOT* get run until *after* you click continue.

When a breakpoint is triggered and the code pauses execution, you will see all of the variables and their values oraganized by their scope appear in the area below the code.

{{breakpoints}}

## Inspecting the Callstack

Everytime a function is called from another function that new function gets added to the JavaScript "Callstack". You can view this callstack at any time when a breakpoint is triggered, so you know exactly what functions were called to reach the point where your breakpoint was placed.

{{callstack}}
