import { A, Code, CodeBlock, H1, H2, H3, Li, Notice, Ol, P, Strong } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'The protocol',
  links: [
    { url: '#html-responses', name: 'HTML responses' },
    { url: '#inertia-responses', name: 'Inertia responses' },
    { url: '#request-headers', name: 'Request headers' },
    { url: '#response-headers', name: 'Response headers' },
    { url: '#the-page-object', name: 'The page object' },
    { url: '#asset-versioning', name: 'Asset versioning' },
    { url: '#partial-reloads', name: 'Partial reloads' },
    { url: '#http-status-codes', name: 'HTTP status codes' },
  ],
}

export default function () {
  return (
    <>
      <H1>The protocol</H1>
      <P>
        This page contains a detailed specification of the Inertia protocol. Be sure to read the{' '}
        <A href="/how-it-works">how it works</A> page first for a high-level overview.
      </P>
      <H2>HTML responses</H2>
      <P>
        The very first request to an Inertia app is just a regular, full-page browser request, with no special Inertia
        headers or data. For these requests, the server returns a full HTML document.
      </P>
      <P>
        This HTML response includes the site assets (CSS, JavaScript) as well as a root <Code>{'<div>'}</Code> in the
        page's body. The root <Code>{'<div>'}</Code> serves as a mounting point for the client-side app, and includes a{' '}
        <Code>data-page</Code> attribute with a JSON encoded <A href="#the-page-object">page object</A> for the initial
        page. Inertia uses this information to boot your client-side framework and display the initial page component.
      </P>
      <div className="mb-6 overflow-hidden rounded" style={{ background: '#202e59' }}>
        <div className="p-6 font-mono text-sm text-white">
          <div className="text-xs font-bold uppercase text-gray-600">Request</div>
          <div className="mt-1">
            <span className="text-blue-400">GET:</span> http://example.com/events/80
          </div>
          <div>
            <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
          </div>
          <div className="mt-8 text-xs font-bold uppercase text-gray-600">Response</div>
          <div className="mt-1">HTTP/1.1 200 OK</div>
          <div>
            <span className="text-blue-400">Content-Type:</span> text/html; charset=utf-8
          </div>
        </div>
      </div>
      <CodeBlock
        className="p-6 leading-normal"
        language="html"
        children={dedent`
            <html>
            <head>
                <title>My app</title>
                <link href="/css/app.css" rel="stylesheet">
                <script src="/js/app.js" defer></script>
            </head>
            <body>

            <div id="app" data-page='{"component":"Event","props":{"event":{"id":80,"title":"Birthday party","start_date":"2019-06-02","description":"Come out and celebrate Jonathan&apos;s 36th birthday party!"}},"url":"/events/80","version":"c32b8e4965f418ad16eaebba1d4e960f"}'></div>

            </body>
            </html>
          `}
      />
      <Notice>
        While the initial response is HTML, Inertia does not server-side render the JavaScript page components.
      </Notice>
      <H2>Inertia responses</H2>
      <P>
        Once the Inertia app has been booted, all subsequent requests to the site are made via XHR with a{' '}
        <Code>X-Inertia</Code> header set to <Code>true</Code>. This header indicates that the request is being made by
        Inertia and isn't a standard full-page visit.
      </P>
      <P>
        When the server detects the <Code>X-Inertia</Code> header, instead of responding with a full HTML document, it
        returns a JSON response with an encoded <A href="#the-page-object">page object</A>.
      </P>
      <div className="mb-6 overflow-hidden rounded" style={{ background: '#202e59' }}>
        <div className="p-6 font-mono text-sm text-white">
          <div className="text-xs font-bold uppercase text-gray-600">Request</div>
          <div className="mt-1">
            <span className="text-blue-400">GET:</span> http://example.com/events/80
          </div>
          <div>
            <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
          </div>
          <div>
            <span className="text-blue-400">X-Requested-With:</span> XMLHttpRequest
          </div>
          <div>
            <span className="text-blue-400">X-Inertia:</span> true
          </div>
          <div>
            <span className="text-blue-400">X-Inertia-Version:</span> 6b16b94d7c51cbe5b1fa42aac98241d5
          </div>
          <div className="mt-8 text-xs font-bold uppercase text-gray-600">Response</div>
          <div className="mt-1">HTTP/1.1 200 OK</div>
          <div>
            <span className="text-blue-400">Content-Type:</span> application/json
          </div>
          <div>
            <span className="text-blue-400">Vary:</span> X-Inertia
          </div>
          <div>
            <span className="text-blue-400">X-Inertia:</span> true
          </div>
        </div>
      </div>
      <CodeBlock
        className="p-6 leading-normal"
        language="json"
        children={dedent`
            {
              "component": "Event",
              "props": {
                "event": {
                  "id": 80,
                  "title": "Birthday party",
                  "start_date": "2019-06-02",
                  "description": "Come out and celebrate Jonathan's 36th birthday party!"
                }
              },
              "url": "/events/80",
              "version": "6b16b94d7c51cbe5b1fa42aac98241d5",
              "encryptHistory": true,
              "clearHistory": false
            }
          `}
      />
      <H2>Request headers</H2>
      <P>
        The following headers are automatically sent by Inertia when making requests. You don't need to set these
        manually, they're handled by the Inertia client-side adapter.
      </P>
      <Ol>
        <Li>
          <Strong>X-Inertia:</Strong> Set to <Code>true</Code> to indicate this is an Inertia request.
        </Li>
        <Li>
          <Strong>X-Requested-With:</Strong> Set to <Code>XMLHttpRequest</Code> on all Inertia requests.
        </Li>
        <Li>
          <Strong>Accept:</Strong> Set to <Code>text/html, application/xhtml+xml</Code> to indicate acceptable response
          types.
        </Li>
        <Li>
          <Strong>X-Inertia-Version:</Strong> The current asset version to check for asset mismatches.
        </Li>
        <Li>
          <Strong>Purpose:</Strong> Set to <Code>prefetch</Code> when making <A href="/prefetching">prefetch</A>{' '}
          requests.
        </Li>
        <Li>
          <Strong>X-Inertia-Partial-Component:</Strong> The component name for{' '}
          <A href="/partial-reloads">partial reloads</A>.
        </Li>
        <Li>
          <Strong>X-Inertia-Partial-Data:</Strong> Comma-separated list of props to include in partial reloads.
        </Li>
        <Li>
          <Strong>X-Inertia-Partial-Except:</Strong> Comma-separated list of props to exclude from partial reloads.
        </Li>
        <Li>
          <Strong>X-Inertia-Reset:</Strong> Comma-separated list of props to reset on navigation.
        </Li>
        <Li>
          <Strong>Cache-Control:</Strong> Set to <Code>no-cache</Code> for reload requests to prevent serving stale
          content.
        </Li>
        <Li>
          <Strong>X-Inertia-Error-Bag:</Strong> Specifies which error bag to use for{' '}
          <A href="/validation">validation errors</A>.
        </Li>
        <Li>
          <Strong>X-Inertia-Infinite-Scroll-Merge-Intent:</Strong> Indicates whether the requested data should be
          appended or prepended when using <A href="/infinite-scroll">infinite scroll</A>.
        </Li>
      </Ol>
      <H2>Response headers</H2>
      <P>
        The following headers should be sent by your server-side adapter in Inertia responses. If you're using an
        official server-side adapter, these are handled automatically.
      </P>
      <Ol>
        <Li>
          <Strong>X-Inertia:</Strong> Set to <Code>true</Code> to confirm this is an Inertia response.
        </Li>
        <Li>
          <Strong>X-Inertia-Location:</Strong> Used for external redirects when a <Code>409 Conflict</Code> response is
          returned due to asset version mismatches.
        </Li>
        <Li>
          <Strong>Vary:</Strong> Set to <Code>X-Inertia</Code> to help browsers correctly differentiate between HTML and
          JSON responses. This header must be included on both HTML and JSON responses to prevent browsers from showing
          JSON content instead of rendered HTML or triggering Inertia error handling for normal page visits. Some
          browsers require this header on all responses, including redirects that lead to Inertia endpoints.
        </Li>
      </Ol>
      <H2>The page object</H2>
      <P>
        Inertia shares data between the server and client via a page object. This object includes the necessary
        information required to render the page component, update the browser's history state, and track the site's
        asset version. The page object can include the following properties:
      </P>
      <Ol>
        <Li>
          <Strong>component:</Strong> The name of the JavaScript page component.
        </Li>
        <Li>
          <Strong>props:</Strong> The page props (data).
        </Li>
        <Li>
          <Strong>url:</Strong> The page URL.
        </Li>
        <Li>
          <Strong>version:</Strong> The current asset version.
        </Li>
        <Li>
          <Strong>encryptHistory:</Strong> Whether or not to encrypt the current page's history state.
        </Li>
        <Li>
          <Strong>clearHistory:</Strong> Whether or not to clear any encrypted history state.
        </Li>
        <Li>
          <Strong>mergeProps:</Strong> Array of prop keys that should be merged (appended) during navigation. See the{' '}
          <A href="/merging-props">merging props</A> documentation for details.
        </Li>
        <Li>
          <Strong>prependProps:</Strong> Array of prop keys that should be prepended during navigation.
        </Li>
        <Li>
          <Strong>deepMergeProps:</Strong> Array of prop keys that should be deep merged during navigation.
        </Li>
        <Li>
          <Strong>matchPropsOn:</Strong> Array of prop keys to use for matching when merging props.
        </Li>
        <Li>
          <Strong>scrollProps:</Strong> Configuration for infinite scroll prop merging behavior.
        </Li>
        <Li>
          <Strong>deferredProps:</Strong> Configuration for client-side lazy loading of props. See the{' '}
          <A href="/deferred-props">deferred props</A> documentation for details.
        </Li>
      </Ol>
      <P>
        On standard full page visits, the page object is JSON encoded into the <Code>data-page</Code> attribute in the
        root <Code>{'<div>'}</Code>. On Inertia visits, the page object is returned as the JSON payload.
      </P>
      <H3>Basic page object</H3>
      <P>A minimal page object contains the core properties.</P>
      <CodeBlock
        className="p-6 leading-normal"
        language="json"
        children={dedent`
            {
              "component": "User/Edit",
              "props": {
                "user": {
                  "name": "Jonathan"
                }
              },
              "url": "/user/123",
              "version": "6b16b94d7c51cbe5b1fa42aac98241d5",
              "clearHistory": false,
              "encryptHistory": false
            }
          `}
      />
      <H3>Page object with deferred props</H3>
      <P>
        When using deferred props, the page object includes a <Code>deferredProps</Code> configuration. Note that
        deferred props are not included in the initial props since they are loaded in a subsequent request.
      </P>
      <CodeBlock
        className="p-6 leading-normal"
        language="json"
        children={dedent`
            {
              "component": "Posts/Index",
              "props": {
                "user": {
                  "name": "Jonathan"
                }
              },
              "url": "/posts",
              "version": "6b16b94d7c51cbe5b1fa42aac98241d5",
              "clearHistory": false,
              "encryptHistory": false,
              "deferredProps": {
                "default": ["comments", "analytics"],
                "sidebar": ["relatedPosts"]
              }
            }
          `}
      />
      <H3>Page object with merge props</H3>
      <P>When using merge props, additional configuration is included.</P>
      <CodeBlock
        className="p-6 leading-normal"
        language="json"
        children={dedent`
            {
              "component": "Feed/Index",
              "props": {
                "user": {
                  "name": "Jonathan"
                },
                "posts": [
                  {"id": 1, "title": "First Post"}
                ],
                "notifications": [
                  {"id": 2, "message": "New comment"}
                ],
                "conversations": {
                  "data": [
                    {"id": 1, "title": "Support Chat", "participants": ["John", "Jane"]}
                  ]
                }
              },
              "url": "/feed",
              "version": "6b16b94d7c51cbe5b1fa42aac98241d5",
              "clearHistory": false,
              "encryptHistory": false,
              "mergeProps": ["posts"],
              "prependProps": ["notifications"],
              "deepMergeProps": ["conversations"],
              "matchPropsOn": ["posts.id", "notifications.id", "conversations.data.id"]
            }
          `}
      />
      <H3>Page object with scroll props</H3>
      <P>
        When using <A href="/infinite-scroll">infinite scroll</A>, the page object includes a <Code>scrollProps</Code>{' '}
        configuration.
      </P>
      <CodeBlock
        className="p-6 leading-normal"
        language="json"
        children={dedent`
            {
              "component": "Posts/Index",
              "props": {
                "posts": {
                  "data": [
                    {"id": 1, "title": "First Post"},
                    {"id": 2, "title": "Second Post"}
                  ]
                }
              },
              "url": "/posts?page=1",
              "version": "6b16b94d7c51cbe5b1fa42aac98241d5",
              "clearHistory": false,
              "encryptHistory": false,
              "mergeProps": ["posts.data"],
              "scrollProps": {
                "posts": {
                  "pageName": "page",
                  "previousPage": null,
                  "nextPage": 2,
                  "currentPage": 1
                }
              }
            }
          `}
      />
      <H2>Asset versioning</H2>
      <P>
        One common challenge with single-page apps is refreshing site assets when they've been changed. Inertia makes
        this easy by optionally tracking the current version of the site's assets. In the event that an asset changes,
        Inertia will automatically make a full-page visit instead of an XHR visit.
      </P>
      <P>
        The Inertia <A href="#the-page-object">page object</A> includes a <Code>version</Code> identifier. This version
        identifier is set server-side and can be a number, string, file hash, or any other value that represents the
        current "version" of your site's assets, as long as the value changes when the site's assets have been updated.
      </P>
      <P>
        Whenever an Inertia request is made, Inertia will include the current asset version in the{' '}
        <Code>X-Inertia-Version</Code> header. When the server receives the request, it compares the asset version
        provided in the <Code>X-Inertia-Version</Code> header with the current asset version. This is typically handled
        in the middleware layer of your server-side framework.
      </P>
      <P>
        If the asset versions are the same, the request simply continues as expected. However, if the asset versions are
        different, the server immediately returns a <Code>409 Conflict</Code> response, and includes the URL in a{' '}
        <Code>X-Inertia-Location</Code> header. This header is necessary, since server-side redirects may have occurred.
        This tells Inertia what the final intended destination URL is.
      </P>
      <P>
        Note, <Code>409 Conflict</Code> responses are only sent for <Code>GET</Code> requests, and not for{' '}
        <Code>POST/PUT/PATCH/DELETE</Code> requests. That said, they will be sent in the event that a <Code>GET</Code>{' '}
        redirect occurs after one of these requests.
      </P>
      <P>
        If "flash" session data exists when a <Code>409 Conflict</Code> response occurs, Inertia's server-side framework
        adapters will automatically reflash this data.
      </P>
      <div className="mb-6 overflow-hidden rounded" style={{ background: '#202e59' }}>
        <div className="p-6 font-mono text-sm text-white">
          <div className="text-xs font-bold uppercase text-gray-600">Request</div>
          <div className="mt-1">
            <span className="text-blue-400">GET:</span> http://example.com/events/80
          </div>
          <div>
            <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
          </div>
          <div>
            <span className="text-blue-400">X-Requested-With:</span> XMLHttpRequest
          </div>
          <div>
            <span className="text-blue-400">X-Inertia:</span> true
          </div>
          <div>
            <span className="text-blue-400">X-Inertia-Version:</span> 6b16b94d7c51cbe5b1fa42aac98241d5
          </div>
          <div className="mt-8 text-xs font-bold uppercase text-gray-600">Response</div>
          <div className="mt-1">409: Conflict</div>
          <div>
            <span className="text-blue-400">X-Inertia-Location:</span> http://example.com/events/80
          </div>
        </div>
      </div>
      <P>
        You can read more about this on the <A href="/asset-versioning">asset versioning</A> page.
      </P>
      <H2>Partial reloads</H2>
      <P>
        When making Inertia requests, the partial reload option allows you to request a subset of the props (data) from
        the server on subsequent visits to the <em>same</em> page component. This can be a helpful performance
        optimization if it's acceptable that some page data becomes stale. See the{' '}
        <A href="/partial-reloads">partial reloads</A> documentation for details.
      </P>
      <P>
        When a partial reload request is made, Inertia includes two additional headers with the request:{' '}
        <Code>X-Inertia-Partial-Data</Code> and <Code>X-Inertia-Partial-Component</Code>.
      </P>
      <P>
        The <Code>X-Inertia-Partial-Data</Code> header is a comma separated list of the desired props (data) keys that
        should be returned.
      </P>
      <P>
        The <Code>X-Inertia-Partial-Component</Code> header includes the name of the component that is being partially
        reloaded. This is necessary, since partial reloads only work for requests made to the same page component. If
        the final destination is different for some reason (eg. the user was logged out and is now on the login page),
        then no partial reloading will occur.
      </P>
      <div className="mb-6 overflow-hidden rounded" style={{ background: '#202e59' }}>
        <div className="p-6 font-mono text-sm text-white">
          <div className="text-xs font-bold uppercase text-gray-600">Request</div>
          <div className="mt-1">
            <span className="text-blue-400">GET:</span> http://example.com/events
          </div>
          <div>
            <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
          </div>
          <div>
            <span className="text-blue-400">X-Requested-With:</span> XMLHttpRequest
          </div>
          <div>
            <span className="text-blue-400">X-Inertia:</span> true
          </div>
          <div>
            <span className="text-blue-400">X-Inertia-Version:</span> 6b16b94d7c51cbe5b1fa42aac98241d5
          </div>
          <div>
            <span className="text-blue-400">X-Inertia-Partial-Data:</span> events
          </div>
          <div>
            <span className="text-blue-400">X-Inertia-Partial-Component:</span> Events
          </div>
          <div className="mt-8 text-xs font-bold uppercase text-gray-600">Response</div>
          <div className="mt-1">HTTP/1.1 200 OK</div>
          <div>
            <span className="text-blue-400">Content-Type:</span> application/json
          </div>
        </div>
      </div>
      <CodeBlock
        className="p-6 leading-normal"
        language="json"
        children={dedent`
            {
              "component": "Events",
              "props": {
                "auth": {...},       // NOT included
                "categories": [...], // NOT included
                "events": [...]      // included
              },
              "url": "/events/80",
              "version": "6b16b94d7c51cbe5b1fa42aac98241d5"
            }
          `}
      />
      <H2>HTTP status codes</H2>
      <P>Inertia uses specific HTTP status codes to handle different scenarios.</P>
      <Ol>
        <Li>
          <Strong>200 OK:</Strong> Standard successful response for both HTML and Inertia JSON responses.
        </Li>
        <Li>
          <Strong>302 Found:</Strong> Standard redirect response. Inertia's server-side adapters automatically convert
          this to <Code>303 See Other</Code> when returned after <Code>PUT</Code>, <Code>PATCH</Code>, or{' '}
          <Code>DELETE</Code> requests.
        </Li>
        <Li>
          <Strong>303 See Other:</Strong> Used for redirects after non-GET requests. This status code tells the browser
          to make a <Code>GET</Code> request to the redirect URL, preventing duplicate form submissions that could occur
          if the browser repeated the original request method.
        </Li>
        <Li>
          <Strong>409 Conflict:</Strong> Returned when there's an asset version mismatch or for external redirects. For
          asset mismatches, this prompts a full page reload. For external redirects, the response includes an{' '}
          <Code>X-Inertia-Location</Code> header and triggers a <Code>window.location</Code> redirect client-side.
        </Li>
      </Ol>
    </>
  )
}
