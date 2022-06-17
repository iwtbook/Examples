# Application

The application tab lets you interact with the various methods of storing data locally that web applications commonly use.

## Local Storage, Session Storage, and IndexedDB

All three of these methods of storing data can be easily accessed from the application tab. Ultimately they are all just storing plain text and have minor differences between them, so making visualizations for them isn't terribly difficult.

{{storage}}

## Cookies

Cookies are stored in a similar manner, except there is a nice table showing the settings defined for each individual cookie such as where the cookie came from, what paths it covers, who can access it and when, things like that.

{{cookies}}

## ServiceWorkers and the Browser Cache

ServiceWorkers and browser cache tools comes in handy when you are creating Progressive Web Apps. The browser cache displays all of the files that have been caches by a ServiceWorker along with the HTTP request data for that file. The ServiceWorker settings up top allow you to pass mesasges to and from your ServiceWorkers, manually update or unregister them, view how many you have registered, and modify the network to simulate offline modes (a feature also available in the network tab)
.
{{sw-and-cache}}
