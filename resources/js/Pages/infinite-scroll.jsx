import { A, Code, CodeBlock, H1, H2, H3, Li, P, TabbedCode, Ul } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Infinite Scroll',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#server-side', name: 'Server-side' },
    { url: '#client-side', name: 'Client-side' },
    { url: '#loading-buffer', name: 'Loading buffer' },
    { url: '#url-synchronization', name: 'URL synchronization' },
    { url: '#loading-direction', name: 'Loading direction' },
    { url: '#reverse-mode', name: 'Reverse mode' },
    { url: '#manual-mode', name: 'Manual mode' },
    { url: '#slots', name: 'Slots' },
    { url: '#custom-element', name: 'Custom element' },
    { url: '#element-targeting', name: 'Element targeting' },
    { url: '#scroll-containers', name: 'Scroll containers' },
    { url: '#programmatic-access', name: 'Programmatic access' },
    { url: '#inertia-scroll-method', name: 'Inertia::scroll() method' },
  ],
}

export default function () {
  return (
    <>
      <H1>Infinite scroll</H1>
      <P>
        Inertia's infinite scroll feature loads additional pages of content as users scroll, replacing traditional
        pagination controls. This is great for applications like chat interfaces, social feeds, photo grids, and product
        listings.
      </P>

      <H2>Server-side</H2>
      <P>
        To configure your paginated data for infinite scrolling, you should use the <Code>Inertia::scroll()</Code> method
        when returning your response. This method automatically configures the proper merge behavior and normalizes
        pagination metadata for the frontend component.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          Route::get('/users', function () {
              return Inertia::render('Users/Index', [
                  'users' => Inertia::scroll(fn () => User::paginate())
              ]);
          });
        `}
      />
      <P>
        The <Code>Inertia::scroll()</Code> method works with Laravel's <Code>paginate()</Code>,{' '}
        <Code>simplePaginate()</Code>, and <Code>cursorPaginate()</Code> methods, as well as pagination data wrapped in{' '}
        <A href="https://laravel.com/docs/eloquent-resources">Eloquent API resources</A>. For more details, check out
        the <A href="#inertia-scroll-method">Inertia::scroll() method</A> documentation.
      </P>

      <H2>Client-side</H2>
      <P>
        On the client side, Inertia provides the <Code>{'<InfiniteScroll>'}</Code> component to automatically load
        additional pages of content. The component accepts a <Code>data</Code> prop that specifies the key of the prop
        containing your paginated data. The <Code>{'<InfiniteScroll>'}</Code> component should wrap the content that
        depends on the paginated data.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users">
                <div v-for="user in users.data" :key="user.id">
                  {{ user.name }}
                </div>
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InfiniteScroll } from '@inertiajs/react'

              export default function Users({ users }) {
                return (
                  <InfiniteScroll data="users">
                    {users.data.map(user => (
                      <div key={user.id}>
                        {user.name}
                      </div>
                    ))}
                  </InfiniteScroll>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <script>
                import { InfiniteScroll } from '@inertiajs/svelte'
                export let users
              </script>

              <InfiniteScroll data="users">
                {#each users.data as user (user.id)}
                  <div>{user.name}</div>
                {/each}
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        The component uses{' '}
        <A href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API" target="_blank">
          intersection observers
        </A>{' '}
        to detect when users scroll near the end of the content and automatically triggers requests to load the next
        page. New data is merged with existing content rather than replacing it.
      </P>
      <H2>Loading buffer</H2>
      <P>
        You can control how early content begins loading by setting a buffer distance. The buffer specifies how many
        pixels before the end of the content loading should begin.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users" :buffer="500">
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" buffer={500}>
                {/* ... */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" buffer={500}>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        In the example above, content will start loading 500 pixels before reaching the end of the current content. A
        larger buffer loads content earlier but potentially loads content that users may never see.
      </P>
      <H2>URL synchronization</H2>
      <P>
        The infinite scroll component updates the browser URL's query string (<Code>?page=...</Code>) as users scroll
        through content. The URL reflects which page has the most visible items on screen, updating in both directions
        as users scroll up or down. This allows users to bookmark or share links to specific pages. You can disable this
        behavior to maintain the original page URL.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users" preserve-url>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" preserveUrl>
                {/* ... */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" preserve-url>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        This is useful when infinite scroll is used for secondary content that shouldn't affect the main page URL, such
        as comments on a blog post or related products on a product page.
      </P>
      <H2>Loading direction</H2>
      <P>
        The infinite scroll component loads content in both directions when you scroll near the start or end. You can
        control this behavior using the <Code>only-next</Code> and <Code>only-previous</Code> props.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <!-- Only load the next page -->
              <InfiniteScroll data="users" only-next>
                <!-- ... -->
              </InfiniteScroll>

              <!-- Only load the previous page -->
              <InfiniteScroll data="messages" only-previous>
                <!-- ... -->
              </InfiniteScroll>

              <!-- Load in both directions (default) -->
              <InfiniteScroll data="posts">
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              {/* Only load the next page */}
              <InfiniteScroll data="users" onlyNext>
                {/* ... */}
              </InfiniteScroll>

              {/* Only load the previous page */}
              <InfiniteScroll data="messages" onlyPrevious>
                {/* ... */}
              </InfiniteScroll>

              {/* Load in both directions (default) */}
              <InfiniteScroll data="posts">
                {/* ... */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <!-- Only load the next page -->
              <InfiniteScroll data="users" only-next>
                <!-- ... -->
              </InfiniteScroll>

              <!-- Only load the previous page -->
              <InfiniteScroll data="messages" only-previous>
                <!-- ... -->
              </InfiniteScroll>

              <!-- Load in both directions (default) -->
              <InfiniteScroll data="posts">
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        The default option is particularly useful when users start on a middle page and need to scroll in both
        directions to access all content.
      </P>
      <H2>Reverse mode</H2>
      <P>
        For chat applications, timelines, or interfaces where content is sorted descendingly (newest items at the bottom), you
        can enable reverse mode. This configures the component to load older content when scrolling upward.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="messages" reverse>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="messages" reverse>
                {/* ... */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="messages" reverse>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        In reverse mode, the component flips the loading directions so that scrolling up loads the next page (older
        content) and scrolling down loads the previous page (newer content). The component handles the loading
        positioning, but you are responsible for reversing your content to display in the correct order.
      </P>
      <P>
        Reverse mode also enables automatic scrolling to the bottom on initial load, which you can disable with{' '}
        <Code>:auto-scroll="false"</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="messages" reverse :auto-scroll="false">
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="messages" reverse autoScroll={false}>
                {/* ... */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="messages" reverse auto-scroll={false}>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <H2>Manual mode</H2>
      <P>
        Manual mode disables automatic loading when scrolling and allows you to control when content loads through the{' '}
        <Code>next</Code> and <Code>previous</Code> slots. For more details about available slot properties and
        customization options, see the <A href="#slots">Slots</A> documentation.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users" manual>
                <template #previous="{ loading, fetch, hasMore }">
                  <button v-if="hasMore" @click="fetch" :disabled="loading">
                    {{ loading ? 'Loading...' : 'Load previous' }}
                  </button>
                </template>

                <!-- Your content -->

                <template #next="{ loading, fetch, hasMore }">
                  <button v-if="hasMore" @click="fetch" :disabled="loading">
                    {{ loading ? 'Loading...' : 'Load more' }}
                  </button>
                </template>
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InfiniteScroll } from '@inertiajs/react'

              export default ({ users }) => (
                <InfiniteScroll
                  data="users"
                  manual
                  previous={({ loading, fetch, hasMore }) => (
                    hasMore && (
                      <button onClick={fetch} disabled={loading}>
                        {loading ? 'Loading...' : 'Load previous'}
                      </button>
                    )
                  )}
                  next={({ loading, fetch, hasMore }) => (
                    hasMore && (
                      <button onClick={fetch} disabled={loading}>
                        {loading ? 'Loading...' : 'Load more'}
                      </button>
                    )
                  )}
                >
                  {users.data.map(user => (
                    <div key={user.id}>{user.name}</div>
                  ))}
                </InfiniteScroll>
              )
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <script>
                import { InfiniteScroll } from '@inertiajs/svelte'
                export let users
              </script>

              <InfiniteScroll data="users" manual>
                <div slot="previous" let:exposedPrevious>
                  {#if exposedPrevious.hasMore}
                    <button on:click={exposedPrevious.fetch} disabled={exposedPrevious.loading}>
                      {exposedPrevious.loading ? 'Loading...' : 'Load previous'}
                    </button>
                  {/if}
                </div>

                {#each users.data as user (user.id)}
                  <div>{user.name}</div>
                {/each}

                <div slot="next" let:exposedNext>
                  {#if exposedNext.hasMore}
                    <button on:click={exposedNext.fetch} disabled={exposedNext.loading}>
                      {exposedNext.loading ? 'Loading...' : 'Load more'}
                    </button>
                  {/if}
                </div>
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        You can also configure the component to automatically switch to manual mode after a certain number of pages
        using the <Code>manualAfter</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users" :manual-after="3">
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" manualAfter={3}>
                {/* ... */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" manual-after={3}>
                <!-- ... -->
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <H2>Slots</H2>
      <P>
        The infinite scroll component provides several slots to customize the loading experience. These slots allow you
        to display custom loading indicators and create manual load controls. Each slot receives properties that provide
        loading state information and functions to trigger content loading.
      </P>
      <H3>Default slot</H3>
      <P>The main content area where you render your data items. This slot receives loading state information.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users" #default="{ loading, loadingPrevious, loadingNext }">
                <!-- Your content with access to loading states -->
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users">
                {({ loading, loadingPrevious, loadingNext }) => (
                  <div>{/* Your content with access to loading states */}</div>
                )}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" let:loading let:loadingPrevious let:loadingNext>
                <!-- Your content with access to loading states -->
              </InfiniteScroll>
            `,
          },
        ]}
      />

      <H3>Loading slot</H3>
      <P>
        The loading slot is used as a fallback when loading content and no custom <Code>before</Code> or{' '}
        <Code>after</Code> slots are provided. This creates a default loading indicator.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users">
                <!-- Your content -->
                <template #loading>
                  Loading more users...
                </template>
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" loading={() => "Loading more users..."}>
                {/* Your content */}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users">
                <!-- Your content -->
                <div slot="loading">
                  Loading more users...
                </div>
              </InfiniteScroll>
            `,
          },
        ]}
      />

      <H3>Previous and next slots</H3>
      <P>
        The <Code>previous</Code> and <Code>next</Code> slots are rendered above and below the main content, typically
        used for manual load controls. These slots receive several properties including loading states, fetch functions,
        and mode indicators.
      </P>
      <CodeBlock
        language="markup"
        children={dedent`
          <InfiniteScroll data="users" :manual-after="3">
            <template #previous="{ loading, fetch, hasMore, manualMode }">
              <button v-if="manualMode && hasMore" @click="fetch" :disabled="loading">
                {{ loading ? 'Loading...' : 'Load previous' }}
              </button>
            </template>

            <!-- Your content -->

            <template #next="{ loading, fetch, hasMore, manualMode }">
              <button v-if="manualMode && hasMore" @click="fetch" :disabled="loading">
                {{ loading ? 'Loading...' : 'Load more' }}
              </button>
            </template>
          </InfiniteScroll>
        `}
      />
      <P>
        The <Code>loading</Code>, <Code>previous</Code>, and <Code>next</Code> slots receive the following properties:
      </P>
      <Ul>
        <Li>
          <Code>loading</Code> - Whether the slot is currently loading content
        </Li>
        <Li>
          <Code>loadingPrevious</Code> - Whether previous content is loading
        </Li>
        <Li>
          <Code>loadingNext</Code> - Whether next content is loading
        </Li>
        <Li>
          <Code>fetch</Code> - Function to trigger loading for the slot
        </Li>
        <Li>
          <Code>hasMore</Code> - Whether more content is available for the slot
        </Li>
        <Li>
          <Code>hasPrevious</Code> - Whether more previous content is available
        </Li>
        <Li>
          <Code>hasNext</Code> - Whether more next content is available
        </Li>
        <Li>
          <Code>manualMode</Code> - Whether manual mode is active
        </Li>
        <Li>
          <Code>autoMode</Code> - Whether automatic loading is active
        </Li>
      </Ul>
      <H2>Custom element</H2>
      <P>
        The <Code>InfiniteScroll</Code> component renders as a <Code>{'<div>'}</Code> element. You may
        customize this to use any HTML element using the <Code>as</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="products" as="ul">
                <li v-for="product in products.data" :key="product.id">
                  {{ product.name }}
                </li>
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="products" as="ul">
                {products.data.map(product => (
                  <li key={product.id}>
                    {product.name}
                  </li>
                ))}
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="products" as="ul">
                {#each products.data as product (product.id)}
                  <li>{product.name}</li>
                {/each}
              </InfiniteScroll>
            `,
          },
        ]}
      />

      <H2>Element targeting</H2>
      <P>
        The infinite scroll component automatically tracks content and assigns page numbers to elements for{' '}
        <A href="#url-synchronization">URL synchronization</A>. When your data items are not direct children of the
        component's root element, you need to specify which element contains the actual data items using the{' '}
        <Code>itemsElement</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll data="users" items-element="#table-body">
                <table>
                  <thead>
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody id="table-body">
                    <tr v-for="user in users.data" :key="user.id">
                      <td>{{ user.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" itemsElement="#table-body">
                <table>
                  <thead>
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody id="table-body">
                    {users.data.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll data="users" items-element="#table-body">
                <table>
                  <thead>
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody id="table-body">
                    {#each users.data as user (user.id)}
                      <tr>
                        <td>{user.name}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        In this example, the component monitors the <Code>#table-body</Code> element and automatically
        tags each <Code>{'<tr>'}</Code>{' '} with a page number as new content loads. This enables
        proper URL updates based on which page's content is most visible in the viewport.
      </P>
      <P>
        You can also specify custom trigger elements for loading more content using CSS selectors. This prevents the
        default trigger elements from being rendered and uses intersection observers on your custom elements instead.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <InfiniteScroll
                data="users"
                items-element="#table-body"
                start-element="#table-header"
                end-element="#table-footer"
              >
                <table>
                  <thead id="table-header">
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody id="table-body">
                    <tr v-for="user in users.data" :key="user.id">
                      <td>{{ user.name }}</td>
                    </tr>
                  </tbody>
                  <tfoot id="table-footer">
                    <tr><td>Footer</td></tr>
                  </tfoot>
                </table>
              </InfiniteScroll>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll
                data="users"
                itemsElement="#table-body"
                startElement="#table-header"
                endElement="#table-footer"
              >
                <table>
                  <thead id="table-header">
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody id="table-body">
                    {users.data.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot id="table-footer">
                    <tr><td>Footer</td></tr>
                  </tfoot>
                </table>
              </InfiniteScroll>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <InfiniteScroll
                data="users"
                items-element="#table-body"
                start-element="#table-header"
                end-element="#table-footer"
              >
                <table>
                  <thead id="table-header">
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody id="table-body">
                    {#each users.data as user (user.id)}
                      <tr>
                        <td>{user.name}</td>
                      </tr>
                    {/each}
                  </tbody>
                  <tfoot id="table-footer">
                    <tr><td>Footer</td></tr>
                  </tfoot>
                </table>
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>
        Alternatively, you can use template refs instead of CSS selectors. This avoids adding HTML attributes and
        provides direct element references.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { ref } from 'vue'
              const tableHeader = ref()
              const tableFooter = ref()
              const tableBody = ref()
              </script>

              <template>
                <InfiniteScroll
                  data="users"
                  :items-element="() => tableBody"
                  :start-element="() => tableHeader"
                  :end-element="() => tableFooter"
                >
                  <table>
                    <thead ref="tableHeader">
                      <tr><th>Name</th></tr>
                    </thead>
                    <tbody ref="tableBody">
                      <tr v-for="user in users.data" :key="user.id">
                        <td>{{ user.name }}</td>
                      </tr>
                    </tbody>
                    <tfoot ref="tableFooter">
                      <tr><td>Footer</td></tr>
                    </tfoot>
                  </table>
                </InfiniteScroll>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { useRef } from 'react'

              export default ({ users }) => {
                const tableHeader = useRef()
                const tableFooter = useRef()
                const tableBody = useRef()

                return (
                  <InfiniteScroll
                    data="users"
                    itemsElement={() => tableBody.current}
                    startElement={() => tableHeader.current}
                    endElement={() => tableFooter.current}
                  >
                    <table>
                      <thead ref={tableHeader}>
                        <tr><th>Name</th></tr>
                      </thead>
                      <tbody ref={tableBody}>
                        {users.data.map(user => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot ref={tableFooter}>
                        <tr><td>Footer</td></tr>
                      </tfoot>
                    </table>
                  </InfiniteScroll>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <script>
                import { InfiniteScroll } from '@inertiajs/svelte'
                export let users

                let tableHeader
                let tableFooter
                let tableBody
              </script>

              <InfiniteScroll
                data="users"
                items-element={() => tableBody}
                start-element={() => tableHeader}
                end-element={() => tableFooter}
              >
                <table>
                  <thead bind:this={tableHeader}>
                    <tr><th>Name</th></tr>
                  </thead>
                  <tbody bind:this={tableBody}>
                    {#each users.data as user (user.id)}
                      <tr>
                        <td>{user.name}</td>
                      </tr>
                    {/each}
                  </tbody>
                  <tfoot bind:this={tableFooter}>
                    <tr><td>Footer</td></tr>
                  </tfoot>
                </table>
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <H2>Scroll containers</H2>
      <P>
        The infinite scroll component works within any scrollable container, not just the main document. The component
        automatically adapts to use the custom scroll container for trigger detection and calculations instead of the
        main document scroll.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <div style="height: 400px; overflow-y: auto;">
                <InfiniteScroll data="users">
                  <div v-for="user in users.data" :key="user.id">
                    {{ user.name }}
                  </div>
                </InfiniteScroll>
              </div>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <div style={{ height: '400px', overflowY: 'auto' }}>
                <InfiniteScroll data="users">
                  {users.data.map(user => (
                    <div key={user.id}>
                      {user.name}
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <div style="height: 400px; overflow-y: auto;">
                <InfiniteScroll data="users">
                  {#each users.data as user (user.id)}
                    <div>{user.name}</div>
                  {/each}
                </InfiniteScroll>
              </div>
            `,
          },
        ]}
      />
      <H3>Multiple scroll containers</H3>
      <P>
        Sometimes you may need to render multiple infinite scroll components on a single page. However, if both
        components use the default <Code>page</Code> query parameter for{' '}
        <A href="#url-synchronization">URL synchronization</A>, they will conflict with each other. To resolve this,
        instruct each paginator to use a custom <Code>pageName</Code>.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          Route::get('/dashboard', function () {
              return Inertia::render('Dashboard', [
                  'users' => Inertia::scroll(
                      fn () => User::paginate(pageName: 'users')
                  ),
                  'orders' => Inertia::scroll(
                      fn () => Order::paginate(pageName: 'orders')
                  ),
              ]);
          });
        `}
      />
      <P>
        The <Code>Inertia::scroll()</Code> method automatically detects the <Code>pageName</Code> from each paginator,
        allowing both scroll containers to maintain independent pagination state. This results in URLs like{' '}
        <Code>?users=2&orders=3</Code> instead of conflicting <Code>?page=</Code> parameters.
      </P>
      <P>
        For more information about pagination page names, see{' '}
        <A href="https://laravel.com/docs/pagination#multiple-paginator-instances-per-page">Laravel's documentation</A>.
      </P>
      <H2>Programmatic access</H2>
      <P>When you need to trigger loading actions programmatically, you may use a template ref.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { ref } from 'vue'
              const infiniteScrollRef = ref(null)

              const fetchNext = () => {
                infiniteScrollRef.value?.fetchNext()
              }
              </script>

              <template>
                <button @click="fetchNext">Load More</button>

                <InfiniteScroll ref="infiniteScrollRef" data="users" manual>
                  <!-- Your content -->
                </InfiniteScroll>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InfiniteScroll } from '@inertiajs/react'
              import { useRef } from 'react'

              export default ({ users }) => {
                const infiniteScrollRef = useRef(null)

                const fetchNext = () => {
                  infiniteScrollRef.current?.fetchNext()
                }

                return (
                  <>
                    <button onClick={fetchNext}>Load More</button>

                    <InfiniteScroll ref={infiniteScrollRef} data="users" manual>
                      {users.data.map(user => (
                        <div key={user.id}>{user.name}</div>
                      ))}
                    </InfiniteScroll>
                  </>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <script>
                import { InfiniteScroll } from '@inertiajs/svelte'
                export let users

                let infiniteScrollRef

                const fetchNext = () => {
                  infiniteScrollRef?.fetchNext()
                }
              </script>

              <button on:click={fetchNext}>Load More</button>

              <InfiniteScroll bind:this={infiniteScrollRef} data="users" manual>
                {#each users.data as user (user.id)}
                  <div>{user.name}</div>
                {/each}
              </InfiniteScroll>
            `,
          },
        ]}
      />
      <P>The component exposes the following methods:</P>
      <Ul>
        <Li>
          <Code>fetchNext()</Code> - Manually fetch the next page
        </Li>
        <Li>
          <Code>fetchPrevious()</Code> - Manually fetch the previous page
        </Li>
        <Li>
          <Code>hasNext()</Code> - Whether there is a next page
        </Li>
        <Li>
          <Code>hasPrevious()</Code> - Whether there is a previous page
        </Li>
      </Ul>

      <H2>Inertia::scroll() method</H2>
      <P>
        The <Code>Inertia::scroll()</Code> method provides server-side configuration for infinite scrolling. It
        automatically configures the proper merge behavior so that new data is appended or prepended to existing content
        instead of replacing it, and normalizes pagination metadata for the frontend component.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          // Works with all Laravel pagination methods...
          Inertia::scroll(User::paginate(20));
          Inertia::scroll(User::simplePaginate(20));
          Inertia::scroll(User::cursorPaginate(20));

          // Works with API resources...
          Inertia::scroll(UserResource::collection(User::paginate(20)));
        `}
      />
      <P>
        If you don't use Laravel's paginator or use a different transformation layer, you may use the additional
        arguments that <Code>scroll()</Code> accepts.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          // Customize the data wrapper key (defaults to 'data')...
          Inertia::scroll($customPaginatedData, wrapper: 'items');

          // Provide custom metadata resolution...
          Inertia::scroll($data, metadata: $metadataProvider);
        `}
      />
      <P>
        The metadata parameter accepts an instance of <Code>ProvidesScrollMetadata</Code> or a callback that returns
        such an instance. The callback receives the <Code>$data</Code> parameter. This is useful when integrating with
        third-party pagination libraries like Fractal.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          use League\\Fractal\\Resource\\Collection;

          class FractalScrollMetadata implements ProvidesScrollMetadata
          {
              public function __construct(protected Collection $resource) {}

              public function getPageName(): string {}

              public function getPreviousPage(): int|string|null {}

              public function getNextPage(): int|string|null {}

              public function getCurrentPage(): int|string|null {}
          }
        `}
      />
      <P>You may then use this custom metadata provider in your scroll function.</P>
      <CodeBlock
        language="php"
        children={dedent`
          // Using an instance directly
          Inertia::scroll($data, metadata: new FractalScrollMetadata($data));

          // Using a callback
          Inertia::scroll(
              fn () => $this->transformData($data),
              metadata: fn ($data) => new FractalScrollMetadata($data)
          );
        `}
      />
      <P>To avoid repeating this setup in multiple controllers, you may define a macro.</P>
      <CodeBlock
        language="php"
        children={dedent`
          // In your AppServiceProvider's boot method
          Inertia::macro('fractalScroll', function (Collection $data) {
              return Inertia::scroll(
                  $data,
                  metadata: fn (Collection $data) => new FractalScrollMetadata($data)
              );
          });

          // Then use it in your controllers
          return Inertia::render('Users/Index', [
              'users' => Inertia::fractalScroll($fractalCollection)
          ]);
        `}
      />
    </>
  )
}
