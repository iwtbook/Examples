# Network

The network tab is one of the most useful aspects of the developer tools. Any and all network requests that are made on your webpage will appear in this network tab.

## At A Glance

Just looking at the network tab on the [democompany.com](https://democompany.com) webpage, we see some checkbox toggles up top (Preserve log, Disable cache, etc), some filtering options just below (Fetch/XHR, JS, CSS, etc), a waterfall chart, and a table of some sort below listing every single resource that was requested.

{{at-a-glance}}

## Selecting a Resource

When we select a resource, you'll notice that a sidebar pops up showing a lot of information about that request. There are three main sections to each request: The `General` section which shows the HTTP request / response line data, a `Response Headers` section, and a `Request Headers` section.

{{selecting-one-pt1}}
{{selecting-one-pt2}}

### General Section

The general section of each request first shows some data that comes from each of the HTTP request and response lines.

{{request-line-meta-pt1}}
{{request-line-meta-pt2}}

## Response Headers

The response headers show metadata about the HTTP response that came back from the web server. In the annotated figure below some of the more important headers have been highlighted for demonstration.

<ul>
  <li>The <span style="background-color:#b6f0b2;display:inline-block;padding:1px 5px;border-radius:2px;">Green</span> headers describe the content in the body of the response (here it is the compression encoding method, the size, and the format).</li>
  <li>The <span style="background-color:#f8b6fc;display:inline-block;padding:1px 5px;border-radius:2px;">Pink</span> header is a timestamp of when the response was sent back</li>
  <li>The <span style="background-color:#ffb2b2;display:inline-block;padding:1px 5px;border-radius:2px;">Red</span> header is a timestamp of when the resource was last updated on the server (used to determine if your local cached version is old)</li>
  <li>The <span style="background-color:#b2c5ef;display:inline-block;padding:1px 5px;border-radius:2px;">Blue</span> header is describing the software that the web server is running</li>
</ul>

{{response-headers-pt1}}
{{response-headers-pt2}}

## Request Headers

The request headers show metadata about the HTTP request being made to the web server. Often times this will include information about the device & browser making the request as well as what kind of content the browser would like back. In the annotated figure below some of the more important headers have been highlighted for demonstration.

<ul>
  <li>The <span style="background-color:#b6f0b2;display:inline-block;padding:1px 5px;border-radius:2px;">Green</span> headers describe what kind of content the device would like back.</li>
  <li>The <span style="background-color:#ffb2b2;display:inline-block;padding:1px 5px;border-radius:2px;">Red</span> header describes how fresh the content returned should be</li>
  <li>The <span style="background-color:#b2c5ef;display:inline-block;padding:1px 5px;border-radius:2px;">Blue</span> header describes which website this request is coming from</li>
  <li>The <span style="background-color:#fff7b2;display:inline-block;padding:1px 5px;border-radius:2px;">Yellow</span> header describes what kind of device and browser is making this request</li>
</ul>

{{request-headers-pt1}}
{{request-headers-pt2}}

## 404 Requests

Any unsuccessful requests (ones that receive response codes that begin with a 4 or a 5) will be highlighted in red so they are easy to catch. They will also usually trigger an error in the console to notify you there as well.

You can read the response code in the `Status` column.

{{request-404}}

## Request Options

You have a lot of options available when you right click on an individual request. You can easily clear your cache or cookies, view the request in a separate panel or tab, and even block that URL or domain entirely from future requests (for debugging purposes).

{{request-options}}

## Throttling & Disabling Cache

One of the most important features of the network tab is the ability to throttle your internet speed so as to simulate slow networks. When making your site as accessible as possible, this is a core component of that process. Disabling the cache can also help you simulate the initial page load times without having to manually dump your cache every time.

{{throttling-and-cache}}

## Network Totals

Finally, when you glance down at the bottom of the network tab you'll see a lot of metrics about the page's network requests. In order from left to right in the figure below they are:

<ol>
  <li>The total number of requests made over the network</li>
  <li>The (compressed) total amount of bytes transferred over the network</li>
  <li>The total amount of bytes received over the network after decompression</li>
  <li>The amount of time from when the first request was made to when the page finished loading, constructing *everything*, and running any set up code. This might be an incredibly large value if you have code that runs continuously in the background so it's not the most accurate value</li>
  <li>The amount of time from when the first request was made to when the DOM finished being constructed</li>
  <li>The amount of time from when the first request was made to when the last request finished loading</li>
</ol>

{{network-totals}}
