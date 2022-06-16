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
  <li>The <span style="background-color:#b6f0b2;display:inline-block;padding:2px 5px;">Green</span> headers describe the content in the body of the response (here it is the compression encoding method, the size, and the format).</li>
  <li>The <span style="background-color:#f8b6fc;display:inline-block;padding:2px 5px;">Pink</span> header is a timestamp of when the response was sent back</li>
  <li>The <span style="background-color:#ffb2b2;display:inline-block;padding:2px 5px;">Red</span> header is a timestamp of when the resource was last updated on the server (used to determine if your local cached version is old)</li>
  <li>The <span style="background-color:#b2c5ef;display:inline-block;padding:2px 5px;">Blue</span> header is describing the software that the web server is running</li>
</ul>

{{response-headers-pt1}}
{{response-headers-pt2}}

## Request Headers

{{request-headers-pt1}}
{{request-headers-pt2}}

## 404 Requests

{{request-404}}

## Request Options

{{request-options}}

## Throttling & Disabling Cache

{{throttling-and-cache}}

## Network Totals

{{network-totals}}
