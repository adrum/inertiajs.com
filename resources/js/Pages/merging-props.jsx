import { A, Code, CodeBlock, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Merging props',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#merge-methods', name: 'Merge methods' },
    { url: '#matching-items', name: 'Matching items' },
    { url: '#deep-merge', name: 'Deep merge' },
    { url: '#client-side-visits', name: 'Client side visits' },
    { url: '#combining-with-deferred-props', name: 'Deferred props' },
    { url: '#resetting-props', name: 'Resetting props' },
  ],
}

export default function () {
  return (
    <>
      <H1>Merging props</H1>
      <P>
        Inertia overwrites props with the same name when reloading a page. However, you may need to merge new data with
        existing data instead. For example, when implementing a "load more" button for paginated results. The{' '}
        <A href="/infinite-scroll">Infinite scroll</A> component uses prop merging under the hood.
      </P>
      <P>
        Prop merging only works during <A href="/partial-reloads">partial reloads</A>. Full page visits will always
        replace props entirely, even if you've marked them for merging.
      </P>
      <H2>Merge methods</H2>
      <P>
        To merge a prop instead of overwriting it, you may use the <Code>Inertia::merge()</Code> method when returning
        your response.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          Route::get('/items', function () {
              // Static array of tags...
              $allTags = [
                  'Laravel', 'React', 'Vue', 'Tailwind', 'Inertia',
                  'PHP', 'JavaScript', 'TypeScript', 'Docker', 'Vite',
              ];

              // Get chunk of tags by page...
              $page = request()->input('page', 1);
              $perPage = 5;
              $offset = ($page - 1) * $perPage;
              $tags = array_slice($allTags, $offset, $perPage);

              return Inertia::render('Tags/Index', [
                  'tags' => Inertia::merge($tags),
              ]);
          });
        `}
      />
      <P>
        The <Code>Inertia::merge()</Code> method will append new items to existing arrays at the root level. You may
        change this behavior to prepend items instead.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          // Append at root level (default)...
          Inertia::merge($items);

          // Prepend at root level...
          Inertia::merge($items)->prepend();
        `}
      />
      <P>
        For more precise control, you can target specific nested properties for merging while replacing the rest of the
        object.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          // Only append to the 'data' array, replace everything else...
          Inertia::merge(User::paginate())->append('data');

          // Prepend to the 'messages' array...
          Inertia::merge($chatData)->prepend('messages');
        `}
      />
      <P>You can combine multiple operations and target several properties at once.</P>
      <CodeBlock
        language="php"
        children={dedent`
          Inertia::merge($forumData)
              ->append('posts')
              ->prepend('announcements');

          // Target multiple properties...
          Inertia::merge($dashboardData)->append(['notifications', 'activities']);
        `}
      />
      <P>
        On the client side, Inertia handles all the merging automatically according to your server-side configuration.
      </P>
      <H2>Matching items</H2>
      <P>
        When merging arrays, you may use the <Code>matchOn</Code> parameter to match existing items by a specific field
        and update them instead of appending new ones.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          // Match posts by ID, update existing ones...
          Inertia::merge($postData)->append('data', matchOn: 'id');

          // Multiple properties with different match fields...
          Inertia::merge($complexData)->append([
              'users.data' => 'id',
              'messages' => 'uuid',
          ]);
        `}
      />
      <P>
        In the first example, Inertia will iterate over the <Code>data</Code> array and attempt to match each item by
        its <Code>id</Code> field. If a match is found, the existing item will be replaced. If no match is found, the
        new item will be appended.
      </P>
      <H2>Deep merge</H2>
      <P>
        Instead of specifying which nested paths should be merged, you may use <Code>Inertia::deepMerge()</Code>
        to ensure a deep merge of the entire structure.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          Route::get('/chat', function () {
              $chatData = [
                  'messages' => [
                      ['id' => 4, 'text' => 'Hello there!', 'user' => 'Alice'],
                      ['id' => 5, 'text' => 'How are you?', 'user' => 'Bob'],
                  ],
                  'online' => 12,
              ];

              return Inertia::render('Chat', [
                  'chat' => Inertia::deepMerge($chatData)->matchOn('messages.id'),
              ]);
          });
        `}
      />
      <Notice>
        <Code>Inertia::deepMerge()</Code> was introduced before <Code>Inertia::merge()</Code> had support for prepending
        and targeting nested paths. In most cases, <Code>Inertia::merge()</Code> with its append and prepend methods
        should be sufficient.
      </Notice>
      <H2 id="client-side-visits">Client side visits</H2>
      <P>
        You can also merge props directly on the client side without making a server request using{' '}
        <A href="/manual-visits#client-side-visits">client side visits</A>. Inertia provides{' '}
        <A href="/manual-visits#prop-helpers">prop helper methods</A> that allow you to append, prepend, or replace prop
        values.
      </P>
      <H2>Combining with deferred props</H2>
      <P>
        You can also combine <A href="/deferred-props">deferred props</A> with mergeable props to defer the loading of
        the prop and ultimately mark it as mergeable once it's loaded.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
            Route::get('/users', function () {
                $page = request()->input('page', 1);
                $perPage = request()->input('per_page', 10);

                return Inertia::render('Users/Index', [
                    'results' => Inertia::defer(fn() => User::paginate($perPage, page: $page))->deepMerge(),
                ]);
            });
            `,
          },
        ]}
      />
      <H2>Resetting props</H2>
      <P>
        On the client side, you can indicate to the server that you would like to reset the prop. This is useful when
        you want to clear the prop value before merging new data, such as when the user enters a new search query on a
        paginated list.
      </P>
      <P>
        The <Code>reset</Code> request option accepts an array of the props keys you would like to reset.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            router.reload({
                reset: ['results'],
                // ...
            })
            `,
          },
        ]}
      />
    </>
  )
}
