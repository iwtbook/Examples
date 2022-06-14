# Console

The `console` tab of our Developer Tools serves two main functions:

1. Display messages from code - whether they be error messages or simple logs.
2. Provide an interface to interact with the document and any code loaded within it.

We'll start with reading logs:

## Inspecting Console Logs

Every log to the console, no matter where it is from, will have a link within it that contains the name of the file it is from and the line number that created it, separated by a colon. Clicking on this link will take you to that specific line in that specific file within the `sources` tab so you can understand the context of the surrounding code.

In the example below, line 31 in the `suspicious.js` file called the `console.log` function which displayed the mouse coordinate message.

{{inspecting-console-logs}}

## Inspecting Error Messages

Similar to console logs, error messages will always have the name of the file that the error occurred in and the line number where that error occurred, separated by a colon. Clicking that link will take you to the line where the error occurred. Most browsers will also give you additional information about why that error occurred both in the original message and in the `sources` tab.

{{inspecting-errors}}

## Inspecting 404s

Some HTTP response codes will also trigger a console error (but not all, so it's usually best to check the `network` tab to ensure that all of your HTTP requests have gone through successfully).

One of the most common to trigger a console error is a `404` response code for when a requested resource cannot be found on the server. Following the link will either bring you to the element in the markup or the code that created the request.

{{inspecting-404s}}

## Executing Simple JavaScript Inline

The `console` tab also lets you write JavaScript inline. This code gets added to the global scope of the document and executed immediately, so you can interact with any global variables within your code as well. Additionally, any variables you add will be stored until the page is refreshed.

{{simple-js}}

## Inspecting Objects

There are some handy built in features of the console, such as the ability to interact with JavaScript objects.

{{inspecting-objects}}

## Interacting with DOM Elements

Querying and modifying elements is also a breeze with the visualizations that the console provides.

{{interacting-with-elements}}
