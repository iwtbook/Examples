# DevTools - The Network Tab

For the next few examples we'll be using the [democompany.com](https://democompany.com/) website.

Loading up the home page of the Demo Company website you will be greeted with the
page on the right. The home page makes the minimum number of HTTP requests a home page can make: One for the *root HTML document* and one for the "*favicon*", which is the small icon on each tab you open.

The browser will always check for a favicon whether or not you specify one, so it is best practice to include one so you don't receive frivolous 404s in your server logs.

If you were to open the Demo Company website in a new tab, your network tab might look something like this:

{{network-tab}}

First is always the root document from which ever subsequent request stems. In our case, it is labeled as `democompany.com`, but note that the filename is actually `index.html`.
