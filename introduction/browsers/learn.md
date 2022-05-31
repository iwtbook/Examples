# How do Browsers Work?

Before we dive into the code, we first must have a basic understanding of our environment.

Browsers have two main functions (that we're concerned with):
1. Send and Receive data over HTTP
2. Construct interactive webpages from HTML, CSS, JavaScript, and any accompanying assets (images, fonts, etc.)

No matter what framework or library or tool is being used, it's all just plain HTML, CSS, and JavaScript under the hood. React is written in plain JavaScript, TypeScript is compiled to JavaScript before it is sent to browsers, and Bootstrap and Tailwind are just plain old CSS (with some JS mixed in there).

It would follow then that if we had a deep understanding of plain HTML, CSS, and JavaScript, we would be able to know exactly what's happening in our browsers at all times. We would be able to go into the source code of any tool that we're using and understand why it is behaving the way that it is. We would be able to pick up any new tool with ease as we would understand what problem it's solving and how it's building on top of the native tools to do so. We would even be able to make our own tools to abstract away common problems we seem to be facing.

That is why in this course we are not going to be covering 3rd party tools in any depth. We are going to create a solid foundation of web knowledge so that you may branch off after this course in whatever direction interests you.

## Figure 1

Since the browser needs all of the website's code to render everything properly on the page, it stores this code locally. We can use the Developer Tools to take a look at this code.

On the right in the first figure we have a browser window showing the developer tools open on the left side. Here we have opened up the Elements tab, the Styles tab, and a JavaScript file in the Sources tab to show that the web page displayed is made up of just HTML, CSS, and JavaScript - and that we have access to all of this code.

## Figure 2

Underneath the surface of a website, browsers create a lot of hidden internal representations for each bit of text and every block or section. With the developer tools you can take a peak at these internal representations to help with your development when you're tweaking and modifying things. Later on in this course we'll go over these internal representations to learn what all of it means and why it's there.
