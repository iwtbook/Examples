# JavaScript Modules

For this explanation, when we refer to a "plain script tag" we are refurring to either of the tags below:

```html
<script></script>            <!-- no attributes -->
<script src="..."></script>  <!-- only the src attribute -->
```

There are two issues that one faces when using plain script tags:

- All plain script tags share one large global scope
- Construction of the DOM haults when the plain script tag is reached and doesn't continue until the script has loaded and finishes executing (unless `defer` or `async` are used)

JavaScript modules aim to fix both of these issues.

## Scoping

### The Problem

When we say that all scripts share the same global scope we mean that every global variable and function (a variable outside of any function or block, also referred to as the "top level") in any location is accessible in any other location.

If I define a global variable of `foo = 'bar'` in `file-1.js` as shown in the example below, I can access this variable in a completely separate file named `file-2.js` - so long as both files are linked in the same document.

```html
<!-- HTML -->

<script src="file-1.js">
<script src="file-2.js">
```

```js
/*--- JavaScript ---*/

/**** file-1.js ****/
let foo = 'bar';

/**** file-2.js ****/
console.log(foo); // 'bar' gets logged to the console
```

This behavior might not prove to be too much of an issue if we only have a few JavaScript files and are writing all of the JavaScript ourselves, but if our code base grows to a considerable size, or we are including many libraries from other developers we are forced to be a lot more defensive in our writing style to avoid any variable or function name collisions.

```html
<!-- HTML -->

<script src="someLib.js">
<script src="yourCode.js">
```

```js
/*--- JavaScript ---*/

/**** someLib.js ****/
let foo = 'bar';

/****  yourCode.js ****/
let foo = 'baz'; // uh-oh, we get an error saying foo has been declared already
console.log(foo); // this line is never reached
```

### Previous Solutions

Before the introduction of JS Modules, one of the popular solutions to this was to
wrap each JavaScript file in a large function that gets called immediately, called an **Immediately Invoked Function Expression**. An example is shown below:

```js
(function () {
  // All of your code goes here
})();
```

Since these IIFEs are nameless you don't have to worry about IIFEs colliding names with each other, and all of the variables inside of the function are scoped to the IIFE (not to the global window) so you don't have to worry about variables inside one IIFE colliding with the variables inside another IIFE.

There are a few drawbacks though:

- Sharing data between two IIFEs was not simple
- All of your code is indented one level so it's not the nicest to read

### Using Modules

JavaScript modules on the other hand have their own unique global scopes - meaning that you don't have to worry about name collisions between modules.

On top of this, modules allow you to explicitly `export` and `import` variables, letting you decide what data you would like to expose and share.

An example of the above:

```html
<!-- HTML -->

<script src="someLib.js" type="module">
<script src="yourCode.js" type="module">
```

```js
/*--- JavaScript ---*/

/**** someLib.js ****/
export let foo = 'bar'; // must export variables if you want them to be imported
let biz = 'baz';
export let test = 'yo';

/**** yourCode.js ****/
import { foo } from './someLib.js';
console.log(foo); // logs out 'bar' since we imported it
let biz = 'abc'; // No name collision!
let test = 'xyz'; // No name collision since we didn't import!
```

## Loading

### CHANGE ME - the problem

As mentioned above, plain script tags will hault the DOM parser in its tracks while the code is fetched, parsed, and executed before allowing it to continue. More often than not this style of loading scripts causes more harm than good. Consider the following scenarios:

- Your script is large or on a slow server and takes more than 1 second to fetch
- Your script is written to manipulate the DOM so it needs to wait for `DOMContentLoaded` before executing
- Your script is a few hundred KB (or even >1MB) and will take a while to parse

In all of the above scenarios it is beneficial to fetch the script in the background while the DOM is parsing, and then parse and execute the code only *once the DOM has finished loading*.

### The Solution

Two attributes for the `<script>` tag exist to do just that: `async` and `defer`. Both attributes will fetch the script in the background *while the DOM is being constructed*, but `async` will parse and execute as soon as the script has finished downloading regardless of whether or not the DOM has finished loading (`defer` waits for DOMContentLoaded before running).

The creators of JavaScript modules saw that in most cases it is beneficial to `defer` the script than not, so JavaScript modules are **always** loading using an implicit `defer` attribute. You can add an `async` attribute to override the implicit `defer`, but modules cannot be loaded like a plain script tag.

Here is a helpful diagram (source: [https://html.spec.whatwg.org/multipage/scripting.html](https://html.spec.whatwg.org/multipage/scripting.html))

{{script-loading}}
