import Nav from '@/Components/Nav'
import TabbedCode from '@/Components/TabbedCode'
import '@docsearch/css'
import * as DocSearchReact from '@docsearch/react'
import { Head, Link, router } from '@inertiajs/react'
import dedent from 'dedent-js'
import React, { useEffect, useState } from 'react'

const { DocSearch } = DocSearchReact

export const CodeTabContext = React.createContext()

const getCurrentCodeTab = tabType => {
  const param = new URLSearchParams(location.search).get(tabType)
  return param ? param : localStorage.getItem('tab.' + tabType)
}

export default function Layout({ meta, children }) {
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)

  function toggleMobileNav(event) {
    event.stopPropagation()
    setShowMobileNav(!showMobileNav)
  }

  const [codeTabs, setCodeTabsState] = useState({
    frontend: 'Vue 3',
    backend: 'Laravel',
  })

  const setCodeTabs = value => {
    setCodeTabsState(value)
    localStorage.setItem('tab.frontend', value.frontend)
    localStorage.setItem('tab.backend', value.backend)
  }

  useEffect(() => {
    setShowSearch(true)

    setCodeTabs({
      frontend: getCurrentCodeTab('frontend') || 'Vue 3',
      backend: getCurrentCodeTab('backend') || 'Laravel',
    })

    // Carbon Ads
    router.on('navigate', () => {
      const carbonScript = document.getElementById('_carbonads_projs')
      if (carbonScript) {
        carbonScript.parentNode.removeChild(carbonScript)
      }
      const adScript = document.createElement('script')
      adScript.setAttribute('async', '')
      adScript.src = '//cdn.carbonads.com/carbon.js?serve=CE7DCKJ7&placement=inertiajscom'
      adScript.id = '_carbonads_js'
      var adElement = document.getElementById('ad')
      adElement.innerHTML = ''
      adElement.appendChild(adScript)
    })
  }, [])

  function HeaderBackground() {
    return (
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <svg className="w-auto" style={{ height: '600px', fill: '#b2b6ff', opacity: '.08' }} viewBox="0 0 95 52.8">
          <path d="M27.3 0H0l26.4 26.4L0 52.8h27.3l26.4-26.4z" />
          <path d="M68.6 0H41.3l26.4 26.4-26.4 26.4h27.3L95 26.4z" />
        </svg>
      </div>
    )
  }

  function Header() {
    return (
      <header className="relative flex items-center justify-between py-12">
        <Link href="/" className="md:flex md:items-end">
          <svg className="block fill-current text-white" style={{ height: '25px' }} viewBox="0 0 275.3 50.5">
            <path d="M231.2 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z" />
            <path d="M258.1 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z" />
            <path d="M6 15.3h10.3l-6 34.2H0l6-34.2zm.6-9.1C7.2 2.9 10.3 0 13.7 0s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.6-3-5.1-6.2zM54.3 28.5l-3.7 21H40.4L43.8 30c.8-4.4-1.6-6.2-4.9-6.2-3.4 0-6.5 2-7.5 6.6L28 49.5H17.8l6-34.2h10.3l-.5 3.2c2.3-2.6 6.2-4.2 10.1-4.2 6.9.1 12.2 5.1 10.6 14.2zM94.5 32.4c-.1.8-.5 2.7-1.1 4.1H68.9c.6 3.8 3.8 4.8 7 4.8 2.9 0 5.2-.8 7.2-2.7l7.2 5.9c-4 4-8.7 6-15 6-11.8 0-18-8.5-16.3-18.7a20.7 20.7 0 0 1 20.5-17.4c9.8 0 16.9 7.6 15 18zm-9.7-3.7c-.3-3.8-3-5.3-6.2-5.3a8.9 8.9 0 0 0-8.3 5.3h14.5zM123.9 14.6l-2 11.6c-4-.6-10.5.8-11.7 7.8l.1-.4-2.8 15.9H97.3l6-34.2h10.3l-1.1 6.2c2.1-4.7 6.6-6.9 11.4-6.9zM137.8 37.3c-.5 3.1 2 3.3 6.6 2.9l-1.6 9.3c-12.3 1.4-16.9-2.7-15.2-12.2l2.1-12.1h-5.5l1.8-9.9h5.4l1.2-6.5 10.8-3.1-1.7 9.6h7.1l-1.8 9.9h-7l-2.2 12.1zM155.3 15.3h10.3l-6 34.2h-10.3l6-34.2zm.6-9.1c.5-3.3 3.7-6.2 7.1-6.2s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.7-3-5.1-6.2zM208.1 15.3l-6 34.2h-10.3l.4-2.3a15.5 15.5 0 0 1-10.3 3.3c-11.1 0-15.3-9.6-13.5-18.9 1.6-8.8 8.6-17.2 19.2-17.2 4.5 0 7.7 1.8 9.6 4.6l.6-3.6h10.3zm-13.2 17.2c.9-5.2-1.9-8.4-6.6-8.4a9.5 9.5 0 0 0-9.5 8.3c-.9 5.1 1.8 8.3 6.6 8.3 4.6.1 8.6-3.1 9.5-8.2z" />
          </svg>
          <svg
            className="mt-2 block fill-current text-white md:mt-0 md:ml-4"
            style={{ height: '8px' }}
            viewBox="0 0 328.3 16"
          >
            <path d="M11.1 2.2H6.6v13.5h-2V2.2H0V.3h11.1v1.9zM29.1.3v15.4h-2V8.8h-7.5v6.9h-2V.3h2v6.5h7.5V.3h2zM46 13.8v1.9h-9.2V.3h9.1v1.9h-7V7h6.5v1.9h-6.5v4.9H46zM77.2 15.7h-2v-12l-5 8.4h-.3l-5-8.4v12h-2V.3h2.3L70 8.4 74.9.3h2.3v15.4zM84 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.4 0 5.9-2.6 5.9-6zM120.2 8c0 4.3-3.1 7.7-7.3 7.7h-6V.3h6c4.2 0 7.3 3.4 7.3 7.7zm-2 0c0-3.3-2.2-5.8-5.3-5.8h-4v11.5h4c3.1.1 5.3-2.5 5.3-5.7zM136.2 13.8v1.9H127V.3h9.1v1.9h-7V7h6.5v1.9h-6.5v4.9h7.1zM148.8 9.8h-3.6v5.9h-2V.3h6.2c2.6 0 4.8 2.1 4.8 4.8 0 2-1.3 3.8-3.2 4.5l3.6 6.2h-2.3l-3.5-6zm-3.6-1.9h4.1c1.5 0 2.8-1.3 2.8-2.9 0-1.6-1.2-2.9-2.8-2.9h-4.1v5.8zM172.6.3v15.4H171l-8-11.5v11.5h-2V.3h1.7l7.9 11.5V.3h2zM204.6 15.7h-2v-12l-5 8.4h-.3l-5-8.4v12h-2V.3h2.3l4.9 8.1 4.9-8.1h2.3v15.4zM211.5 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.3 0 5.9-2.6 5.9-6zM245.9.3v15.4h-1.6l-7.9-11.5v11.5h-2V.3h1.7l7.9 11.5V.3h1.9zM252.8 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.3 0 5.9-2.6 5.9-6zM284.3 13.8v1.9h-8.7V.3h2v13.5h6.7zM292.8.3v15.4h-2V.3h2zM310.3 2.2h-4.6v13.5h-2V2.2h-4.5V.3h11.1v1.9zM328.3.3v15.4h-2V8.8h-7.5v6.9h-2V.3h2v6.5h7.5V.3h2z" />
          </svg>
        </Link>
        <div onClick={toggleMobileNav} className="relative z-10 md:hidden">
          <button className="focus:outline-none block" type="button">
            <svg className="block h-6 w-6 fill-current text-white" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
          {showMobileNav && (
            <Nav className="absolute top-0 right-0 z-50 -mt-4 whitespace-nowrap rounded bg-white px-6 pb-6 shadow-xl" />
          )}
        </div>
        <div className="hidden items-center text-white md:flex">
          <div className="relative -my-2 mr-5">
            {showSearch && (
              <DocSearch appId="VKGU7LHY9C" indexName="inertiajs" apiKey="cebbd114b9b67501184b39b00f94f765" />
            )}
          </div>
          <a className="mr-5 flex items-center hover:text-purple-900" href="https://github.com/inertiajs">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
              <title>GitHub</title>
              <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" />
            </svg>
          </a>
          <a className="mr-5 flex items-center hover:text-purple-900" href="https://twitter.com/inertiajs">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
              <title>Twitter</title>
              <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84" />
            </svg>
          </a>
          <a className="flex items-center hover:text-purple-900" href="https://discord.gg/inertiajs">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 146 146">
              <title>Discord</title>
              <path d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z" />
            </svg>
          </a>
        </div>
      </header>
    )
  }

  function Hero() {
    return (
      <div className="relative flex flex-wrap items-start lg:mt-16">
        <div className="mt-4 w-full lg:w-1/2">
          <div className="text-4xl font-light leading-tight lg:text-5xl">
            Build single-page apps, <strong className="font-bold">without building an API.</strong>
          </div>
          <p className="mt-8 max-w-md pr-2 text-lg leading-relaxed lg:text-xl">
            Create{' '}
            <strong className="font-bold" style={{ color: '#92eee2' }}>
              modern single-page React, Vue, and Svelte apps
            </strong>{' '}
            using classic server-side routing. Works with any backend — tuned for Laravel.
          </p>
        </div>
        <div className="mt-8 w-full lg:mt-0 lg:w-1/2 lg:pl-24">
          <TabbedCode
            className="overflow-hidden rounded-t"
            height="330"
            examples={[
              {
                name: 'UsersController.php',
                language: 'php',
                code: dedent`
                  class UsersController
                  {
                      public function index()
                      {
                          $users = User::active()
                              ->orderByName()
                              ->get(['id', 'name', 'email']);

                          return Inertia::render('Users', [
                              'users' => $users
                          ]);
                      }
                  }
                `,
              },
              {
                name: 'Users.vue',
                language: 'markup',
                code: dedent`
                  <script setup>
                  import Layout from './Layout'
                  import { Link, Head } from '@inertiajs/vue3'

                  defineProps({ users: Array })
                  </script>

                  <template>
                    <Layout>
                      <Head title="Users" />
                      <div v-for="user in users" :key="user.id">
                        <Link :href="\`/users/\${user.id}\`">
                          {{ user.name }}
                        </Link>
                        <div>{{ user.email }}</div>
                      </div>
                    </Layout>
                  </template>
                `,
              },
            ]}
          />
        </div>
      </div>
    )
  }

  function Sponsors() {
    return (
      <div className="bg-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-start overflow-x-auto px-6 py-4 md:px-12 xl:px-0">
          <div className="text-md mr-6 font-medium text-gray-600 lg:mr-12">
            <div className="md:hidden">Sponsors:</div>
            <div className="hidden whitespace-nowrap md:block">Our sponsors:</div>
          </div>
          <a
            className="mr-8 text-gray-600 hover:text-gray-800 lg:mr-16"
            href="https://forge.laravel.com"
            title="Laravel Forge"
          >
            <svg className="h-3.5 w-auto fill-current" viewBox="0 0 217.38 39.97">
              <path d="M77.94.32c4.13 0 6.03.74 7.2 2.22 1.68 2.22 2.64 6.66-.11 17.55S79.2 35.3 76.36 37.64c-1.9 1.48-4.23 2.22-8.36 2.22H54.8c-4.13 0-6.13-.74-7.2-2.22-1.68-2.22-2.63-6.66.22-17.55 2.75-10.9 5.92-15.23 8.78-17.55C58.49 1.06 60.8.32 64.94.32h13zM58.7 30.24c.21.32.74.42 2.43.42h5.08c1.69 0 2.32-.1 2.75-.42.52-.42 1.48-1.48 3.59-10.15 2.22-8.67 1.8-9.73 1.48-10.15-.21-.32-.74-.42-2.43-.42h-4.97c-1.7 0-2.33.1-2.75.42-.53.42-1.48 1.48-3.6 10.15-2.32 8.77-1.9 9.73-1.58 10.15zm51.28-3.17c-.42-.53-.85-.74-3.38-.74h-4.97c-.53 0-1.06.42-1.17.95L97.61 38.9c-.1.53-.64.95-1.16.95H86.19c-.53 0-.85-.42-.74-.95l9.4-37.64c.11-.53.64-.95 1.17-.95h24.1c3.92 0 6.03.53 7.2 2 1.27 1.8 1.69 3.7.32 9.2-1.8 7.4-4.55 9.52-9.3 10.47v.1c3.7.96 5.7 2.23 4.43 7.94-.74 3.27-1.27 6.55-1.58 8.77-.11.53-.64 1.06-1.17 1.06h-10.46c-.43 0-.85-.32-.74-.85.31-2.43.74-4.86 1.37-7.93.42-2.85.21-3.38-.21-4.01zm-.74-9.3c2.22 0 2.85-.11 3.28-.43.74-.53 1.26-1.48 1.8-3.8s.42-3.18 0-3.7c-.32-.32-.85-.43-3.07-.43h-5.5c-.53 0-1.06.42-1.16.95L103 16.92c-.1.53.21.95.74.95h5.5v-.1zM160.94 0c4.23 0 6.45.53 7.72 2 1.48 1.8 2 4.56.84 10.69-.1.53-.63.95-1.16.95h-9.83c-.53 0-.85-.42-.74-.85.42-2.43-.1-2.75-.43-3.17-.2-.32-.63-.42-2.43-.42h-5.07c-1.8 0-2.33.1-2.75.42-.64.53-1.8 2.33-3.7 10.36s-1.59 9.94-1.27 10.47c.21.32.74.42 2.54.42h5.39c1.59 0 2.22-.1 2.64-.42.53-.42 1.59-1.48 2.22-4.33l.1-.32h-7.6c-.53 0-.85-.43-.74-.95l1.48-6.35c.1-.53.63-.95 1.16-.95h18.3c.52 0 .84.42.73.95l-.95 3.91c-2.22 9.63-4.86 13-7.61 15.23-2.01 1.7-4.87 2.33-8.57 2.33H138c-4.13 0-6.14-.74-7.3-2.33-1.8-2.33-2.75-6.66-.1-17.66s5.7-15.43 8.56-17.65C141.06.74 143.39 0 147.51 0h13.43zm41.23 39.97h-31.6c-.54 0-.85-.43-.75-.96L178.7.95c.1-.53.64-.95 1.17-.95h36.79c.63 0 .95.63.53 1.27-1.59 2.54-7.72 7.93-14.6 7.93H189.8c-.52 0-1.05.42-1.16.95l-.95 4.23c-.1.53.21.95.74.95h17.23c.53 0 .85.42.74.95l-1.48 6.66c-.1.53-.63.95-1.16.95h-17.23c-.53 0-1.06.43-1.17.96l-1.16 4.86c-.1.53.21.95.74.95h19.35c.53 0 .84.42.74.95l-1.7 7.3c-.1.63-.63 1.06-1.16 1.06zM50.24.32H6.9c-.53 0-1.05.42-1.16.95l-1.06 3.8c-.1.43.1.75.43.96 1.69.53 10.78.74 9.4 5.81l-.31 1.38-3.7 13.85-.32 1.37c-1.37 5.08-6.24 5.29-8.25 5.82-.42.1-.74.52-.84.95L.02 39c-.1.53.21.96.74.96h17.66c.53 0 1.05-.43 1.16-.96l3.17-12.26c.1-.53.64-.95 1.16-.95h11.32c.53 0 1.06-.43 1.16-.95l1.7-6.56c.1-.53-.22-.95-.75-.95H26.03c-.53 0-.85-.42-.74-.95l1.59-5.92c.1-.53.63-.95 1.16-.95h17.02c.53 0 1.06-.43 1.16-.96l4.55-7.19c.21-.63 0-1.05-.53-1.05z" />
            </svg>
          </a>
          <a className="mr-8 text-gray-600 hover:text-gray-800 lg:mr-16" href="https://ploi.io" title="Ploi">
            <svg className="h-5 w-auto fill-current" viewBox="0 0 253 93.3">
              <path d="M25.7 66a11.4 11.4 0 01-9.5-4.7q-3.6-4.7-3.7-12.6T16.2 36a11.4 11.4 0 019.5-4.7 11.4 11.4 0 019.6 4.7Q39 40.7 39 48.7t-3.6 12.6a11.5 11.5 0 01-9.6 4.7zm3.8-45.1a18.9 18.9 0 00-10.2 2.7 18 18 0 00-6.7 7.5h-.3v-9.3H0v71.5h12.6V66.5h.3a17 17 0 006.6 7.2 19.4 19.4 0 0010.2 2.6q10.2 0 16.1-7.4t6-20.3q0-12.9-6-20.4T29.5 21zM59.2 75.5h12.6V2.5H59.2v73.1zM105.3 66.6a11.5 11.5 0 01-9.6-4.7Q92 57.2 92 48.7t3.6-13.3a12.1 12.1 0 0119.2 0q3.6 4.7 3.6 13.3t-3.6 13.2a11.5 11.5 0 01-9.6 4.7zm0 10q11.8 0 19-7.4t7-20.6q0-13-7.1-20.4t-19-7.5q-11.7 0-18.8 7.5t-7.1 20.4q0 13.2 7 20.6t19 7.4zM145 13.7a6.7 6.7 0 004.9-2 6.6 6.6 0 002-4.8 6.6 6.6 0 00-2-4.9 6.8 6.8 0 00-5-2 6.7 6.7 0 00-4.8 2 6.5 6.5 0 00-2 4.9 6.5 6.5 0 002 4.8 6.6 6.6 0 004.8 2zm-6.3 61.9h12.6V21.8h-12.7v53.8zM168.8 76a5.7 5.7 0 10-4.1-1.6 5.6 5.6 0 004 1.7zM191.5 13.4a5.3 5.3 0 004-1.6A5.3 5.3 0 00197 8a5.5 5.5 0 10-11 0 5.3 5.3 0 001.5 4 5.3 5.3 0 004 1.5zm-4.4 62.1h8.8V22.8H187v52.8zM228.6 68.7a13.8 13.8 0 01-11.2-5q-4.3-5.2-4.3-14.5t4.3-14.4a14.9 14.9 0 0122.4 0q4.2 5 4.2 14.4t-4.2 14.4a13.8 13.8 0 01-11.2 5.1zm0 7.8q10.9 0 17.6-7.4t6.8-20q0-12.5-6.8-19.9T228.7 22q-11 0-17.7 7.3t-6.7 20q0 12.6 6.7 20t17.7 7.3z" />
            </svg>
          </a>
          <a
            className="mr-12 text-gray-600 hover:text-gray-800"
            href="https://www.activitysource.com"
            title="ActivitySource"
          >
            <svg className="h-4 w-auto fill-current" viewBox="0 0 209.6 30.1">
              <path d="M44.3 3.9h3.2l7 20.2H51L49.4 19h-7l-1.7 5.1h-3.4l7-20.2zm4.1 12.3l-2.5-8-2.6 8h5.1zM54 16.9c0-4 2.3-7.5 6.9-7.5 3.1 0 5.3 1.4 6.4 4.1l-2.7 1.1c-.8-1.6-1.9-2.6-3.7-2.6-2.5 0-3.7 2.1-3.7 4.9s1.2 4.9 3.7 4.9c1.8 0 2.9-.9 3.7-2.6l2.7 1.1c-1.1 2.7-3.3 4.1-6.4 4.1-4.6 0-6.9-3.5-6.9-7.5zM70.5 19.3v-7.1h-2.3V9.6h2.3v-4l3.1-1.9v5.9h3.9v2.7h-3.9v7.1c0 1.8.7 2.4 1.9 2.4.5 0 1-.1 1.5-.4l.7 2.5c-.8.4-1.6.5-2.4.5-2.9 0-4.8-1.6-4.8-5.1zM78.7 5.4c0-1.2.9-2.1 2.1-2.1 1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1c-1.2 0-2.1-.9-2.1-2.1zm.5 4.2h3.1v14.6h-3.1V9.6zM83.8 9.6h3.1l3.3 10.8 3.3-10.8h3.1l-4.9 14.6h-2.8L83.8 9.6zM97.5 5.4c0-1.2.9-2.1 2.1-2.1 1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1c-1.3 0-2.1-.9-2.1-2.1zm.5 4.2h3.1v14.6H98V9.6zM105.1 19.3v-7.1h-2.3V9.6h2.3v-4l3.1-1.9v5.9h3.9v2.7h-3.9v7.1c0 1.8.7 2.4 1.9 2.4.5 0 1-.1 1.5-.4l.7 2.5c-.8.4-1.6.5-2.4.5-2.9 0-4.8-1.6-4.8-5.1zM118.5 23.5l-5.3-13.9h3.1l3.7 9.9 3.4-9.9h3.1l-7.4 20.5h-2.9l2.3-6.6zM128 18.8l2.6-1.6c.6 2.3 1.8 4.2 4.2 4.2 1.6 0 2.9-.9 2.9-2.9s-2.2-2.9-4.6-4.1c-2.1-1-4-2.6-4-5.6s2.3-5.2 5.4-5.2c2.8 0 4.5 1.3 5.5 3.5l-2.6 1.7c-.6-1.7-1.7-2.2-2.9-2.2-1.3 0-2.3.9-2.3 2.1 0 1.9 2 2.8 4.1 3.7 2.5 1.1 4.6 2.6 4.6 5.9 0 3.7-2.6 6-6.2 6-3.5.1-6-2.4-6.7-5.5zM142.2 16.9c0-4.1 2.7-7.5 7.2-7.5s7.2 3.4 7.2 7.5-2.7 7.5-7.2 7.5-7.2-3.4-7.2-7.5zm11.3 0c0-2.6-1.4-4.9-4-4.9s-4 2.3-4 4.9 1.4 4.9 4 4.9 4-2.3 4-4.9zM158.3 19.9V9.6h3.1v9.5c0 1.8.9 2.7 2.3 2.7 2 0 3.8-2.2 3.8-6.2v-6h3v14.6h-3v-2.5c-1.1 1.7-2.7 2.8-4.7 2.8-2.7-.1-4.5-1.6-4.5-4.6zM172.5 9.6h3.1V12c1-1.7 2.5-2.7 4.3-2.7.7 0 1.3.1 1.9.3l-.6 2.8c-.5-.3-1-.4-1.7-.4-2.1 0-3.9 1.9-3.9 6.7V24h-3.1V9.6zM181.6 16.9c0-4 2.3-7.5 6.9-7.5 3.1 0 5.3 1.4 6.4 4.1l-2.7 1.1c-.8-1.7-1.9-2.6-3.7-2.6-2.5 0-3.7 2.1-3.7 4.9s1.2 4.9 3.7 4.9c1.8 0 2.9-.9 3.7-2.6l2.7 1.1c-1.1 2.7-3.3 4.1-6.4 4.1-4.6 0-6.9-3.5-6.9-7.5zM196.1 16.9c0-3.7 2.2-7.5 6.8-7.5 4.5 0 6.7 3.6 6.7 7.1v1.3h-10.3c.1 2.2 1.4 4.1 3.8 4.1 1.8 0 2.9-.8 3.8-2.5l2.5 1c-1.2 2.7-3.2 4.2-6.5 4.2-4.6-.2-6.8-4-6.8-7.7zm10.4-1.7c-.3-1.8-1.4-3.2-3.6-3.2-2 0-3.2 1.5-3.5 3.2h7.1z" />
              <path d="M14.5 0C6.5 0 0 6.3 0 14.1s6.5 14.1 14.5 14.1c3.8 0 7.4-1.4 10.1-4h-4.1c-1.8 1-3.9 1.6-6 1.6-6.7 0-12.1-5.2-12.1-11.7 0-6.4 5.4-11.7 12.1-11.7s12.1 5.2 12.1 11.7c0 .8-.1 1.6-.3 2.4-.1.6-.3 1.1-.4 1.3-.4 1-.8 1.1-1.1 1.1-.4 0-.6-.3-.7-.5l-.3-1s-.2-.5-.2-.8c-.4-1.3-1.5-2.2-2.8-2.3-1-.1-1.9.3-2.6 1.1-.2.2-.4.5-.6.8-.1.2-.2.4-.4.7l.1.1-.3.6c-.5 1.1-.9 1.3-1.2 1.2-.4 0-.6-.3-.7-.5l-.5-1.5-3.5-10.1H8.8L4.4 19.5H7l3-9.2 2.6 8.2v.1c.1.3.1.5.2.6.4 1.3 1.5 2.2 2.8 2.3 2 .1 3-1.4 3.5-2.6l.1-.2c.1-.2.2-.4.2-.5.5-1.1.9-1.3 1.2-1.3.4 0 .6.3.7.5l.3 1s.2.5.2.8c.4 1.3 1.5 2.2 2.8 2.3 2 .1 3-1.4 3.5-2.6l.3-.6c.3-.8.4-1.6.4-1.8.1-.8.2-1.6.2-2.4C29 6.3 22.5 0 14.5 0z" />
            </svg>
          </a>
          <a className="mr-8 text-gray-600 hover:text-gray-800 lg:mr-16" href="https://laracasts.com" title="Laracasts">
            <svg className="h-3 w-auto fill-current" viewBox="0 0 206 24">
              <path d="M0 3.4h4.47v15.677h9.683v3.643H0V3.4zm34.146 15.18H25.18l-1.71 4.14h-4.58L27.496 3.4h4.415l8.635 19.32h-4.69l-1.71-4.14zm-1.407-3.395l-3.062-7.397-3.063 7.397h6.125zm26.725 7.535l-3.724-5.382h-4.111v5.382h-4.47V3.4h8.36c1.71 0 3.196.285 4.456.855 1.26.57 2.23 1.38 2.91 2.43.68 1.048 1.021 2.29 1.021 3.725 0 1.436-.345 2.673-1.035 3.713s-1.669 1.835-2.938 2.387l4.332 6.21h-4.8zm-.083-12.31c0-1.085-.35-1.918-1.048-2.498-.699-.58-1.72-.869-3.062-.869h-3.642v6.735h3.642c1.342 0 2.363-.295 3.062-.884.699-.588 1.048-1.416 1.048-2.484zm25.373 8.17h-8.966l-1.71 4.14h-4.58L78.104 3.4h4.415l8.635 19.32h-4.69l-1.71-4.14zm-1.407-3.395l-3.062-7.397-3.063 7.397h6.125zm23.387 7.867c-1.968 0-3.748-.428-5.339-1.284-1.59-.855-2.841-2.042-3.752-3.56-.91-1.518-1.366-3.234-1.366-5.148 0-1.914.456-3.63 1.366-5.148.91-1.518 2.161-2.704 3.752-3.56 1.591-.856 3.38-1.284 5.366-1.284 1.674 0 3.187.295 4.539.884a9.09 9.09 0 0 1 3.407 2.539l-2.87 2.65c-1.305-1.51-2.924-2.264-4.855-2.264-1.195 0-2.262.263-3.2.787a5.59 5.59 0 0 0-2.194 2.194c-.524.939-.786 2.006-.786 3.202 0 1.196.262 2.263.786 3.202a5.59 5.59 0 0 0 2.194 2.194c.938.524 2.005.787 3.2.787 1.931 0 3.55-.764 4.856-2.291l2.87 2.65a8.944 8.944 0 0 1-3.422 2.566c-1.361.59-2.878.884-4.552.884zm47.27 0c-1.527 0-3.003-.207-4.429-.621-1.425-.414-2.57-.953-3.435-1.615l1.518-3.367c.828.607 1.812 1.094 2.952 1.462 1.14.368 2.28.552 3.421.552 1.27 0 2.207-.188 2.814-.565.607-.378.91-.879.91-1.505 0-.46-.179-.841-.537-1.145-.36-.304-.819-.547-1.38-.731a27.449 27.449 0 0 0-2.276-.608c-1.471-.35-2.676-.699-3.614-1.049a5.872 5.872 0 0 1-2.414-1.683c-.672-.773-1.007-1.803-1.007-3.091 0-1.123.303-2.14.91-3.05.607-.911 1.522-1.633 2.745-2.167 1.223-.534 2.718-.8 4.484-.8 1.232 0 2.437.147 3.614.441 1.177.295 2.207.718 3.09 1.27l-1.38 3.395c-1.784-1.012-3.568-1.518-5.352-1.518-1.25 0-2.175.202-2.773.607-.598.405-.896.938-.896 1.6 0 .663.344 1.155 1.034 1.477.69.322 1.743.64 3.16.953 1.47.35 2.675.699 3.613 1.048.938.35 1.743.902 2.414 1.656.672.755 1.007 1.776 1.007 3.064a5.277 5.277 0 0 1-.924 3.022c-.616.911-1.54 1.634-2.773 2.167-1.232.534-2.73.8-4.497.8zm19.579-16.009h-6.18V3.4h16.83v3.643h-6.18V22.72h-4.47V7.043zm23.855 16.009c-1.526 0-3.002-.207-4.428-.621-1.425-.414-2.57-.953-3.435-1.615l1.518-3.367c.827.607 1.811 1.094 2.952 1.462 1.14.368 2.28.552 3.42.552 1.27 0 2.208-.188 2.815-.565.607-.378.91-.879.91-1.505 0-.46-.18-.841-.538-1.145-.358-.304-.818-.547-1.38-.731a27.449 27.449 0 0 0-2.275-.608c-1.472-.35-2.676-.699-3.614-1.049a5.872 5.872 0 0 1-2.415-1.683c-.67-.773-1.007-1.803-1.007-3.091 0-1.123.304-2.14.91-3.05.608-.911 1.523-1.633 2.746-2.167 1.223-.534 2.718-.8 4.483-.8 1.233 0 2.437.147 3.614.441 1.178.295 2.208.718 3.09 1.27l-1.379 3.395c-1.784-1.012-3.568-1.518-5.352-1.518-1.251 0-2.175.202-2.773.607-.598.405-.897.938-.897 1.6 0 .663.345 1.155 1.035 1.477.69.322 1.743.64 3.159.953 1.471.35 2.676.699 3.614 1.048.938.35 1.743.902 2.414 1.656.671.755 1.007 1.776 1.007 3.064a5.277 5.277 0 0 1-.924 3.022c-.616.911-1.54 1.634-2.773 2.167-1.232.534-2.731.8-4.497.8z" />
              <path d="M123.42 6.017l3.147 3.146a1.661 1.661 0 1 1-2.35 2.35l-3.146-3.146a1.661 1.661 0 1 1 2.35-2.35zM130.15 12.746l6.742 6.742a1.661 1.661 0 1 1-2.35 2.35l-6.742-6.742a1.661 1.661 0 1 1 2.35-2.35z" />
              <path d="M121.823 5.59L139.95.876a1.707 1.707 0 0 1 2.076 1.198 1.658 1.658 0 0 1-1.182 2.046l-18.125 4.715a1.707 1.707 0 0 1-2.076-1.199 1.658 1.658 0 0 1 1.181-2.046z" />
              <path d="M134.083 20.2l4.715-18.125a1.658 1.658 0 0 1 2.046-1.182 1.707 1.707 0 0 1 1.198 2.076l-4.714 18.126a1.658 1.658 0 0 1-2.046 1.18 1.707 1.707 0 0 1-1.199-2.075zM133.465 11.86l-6.55 6.55a1.69 1.69 0 1 1-2.39-2.39l6.55-6.549a1.69 1.69 0 0 1 2.39 2.39zM123.715 21.61l-.986.987a1.69 1.69 0 1 1-2.39-2.39l.986-.986a1.69 1.69 0 0 1 2.39 2.39z" />
            </svg>
          </a>
          <a
            className="mr-8 text-gray-600 hover:text-gray-800 lg:mr-16"
            href="https://www.peakcrypto.com"
            title="Peak Crypto"
          >
            <svg className="h-5 w-auto fill-current" viewBox="0 0 3001 895">
              <path d="M99.429 727.675c82.028 101.815 207.62 167.134 348.246 167.134 246.555 0 447.134-200.58 447.134-447.134C894.809 201.13 694.23.541 447.675.541 201.13.541.542 201.13.542 447.675c0 98.05 31.807 188.766 85.52 262.548l13.367 17.452Zm348.246 131.043c-127.409 0-241.452-58.268-316.909-149.55l239.795-239.795 103.302 103.293c7.051 7.05 18.469 7.05 25.51 0 7.051-7.051 7.051-18.469 0-25.511l-42.218-42.209 163.829-163.83 221.317 221.308c-49.796 170.965-207.799 296.294-394.626 296.294ZM1441.63 104.011c-8.57-18.453-20.43-34.929-35.59-49.427-15.82-13.84-34.6-24.713-56.35-32.621-23.72-7.249-48.76-10.874-75.13-10.874h-184.85v74.14h177.95c29.65 0 54.36 7.249 74.14 21.748 18.45 13.84 27.67 34.928 27.67 63.266 0 25.703-8.89 46.462-26.69 62.278-19.11 15.157-44.15 22.736-75.12 22.736h-177.95v226.379h82.05V330.392h92.93c24.38 0 49.09-3.625 74.14-10.874 23.06-7.249 42.83-17.464 59.31-30.643 17.13-13.18 30.64-29.986 40.53-50.416 9.88-19.77 14.82-42.836 14.82-69.197 0-25.042-3.96-46.797-11.86-65.251Zm160.13-92.925h351.93v75.129h-351.93V11.085Zm0 395.415h350.93v75.128h-350.93v-75.128Zm0-199.683h317.32v74.14h-317.32v-74.14Zm817.51 274.811h88.97l-172-471.534h-89.96l99.84 281.736 73.15 189.798Zm-363.77 0h86.99l102.8-251.09-42.5-112.693-147.29 363.783Zm945.04-.988-161.13-205.614-56.35 61.289 117.64 144.322 99.84.003ZM2890.81 11.086l-224.39 232.3v-232.3h-81.06v469.547h81.06V369.918l333.13-358.832h-108.74ZM1101.9 666.125c7.69-18.809 18.81-34.839 33.34-48.091 13.25-13.252 30.35-23.939 51.3-32.061 20.94-8.122 42.96-12.183 66.04-12.183h71.18v48.732h-70.54c-16.67 0-31.42 2.779-44.24 8.336-13.68 5.557-24.79 12.824-33.34 21.802-8.98 8.549-16.25 19.663-21.8 33.342-5.13 12.397-7.7 26.29-7.7 41.679 0 15.389 2.57 29.282 7.7 41.679 5.13 12.824 12.39 23.938 21.8 33.343 8.55 8.549 19.66 15.603 33.34 21.16 13.68 5.13 28.43 7.695 44.24 7.695h70.54v48.732h-71.18c-23.94 0-45.74-3.847-65.4-11.542-20.52-8.549-37.83-19.451-51.94-32.703-14.53-13.678-25.65-29.923-33.34-48.731-8.13-19.665-12.19-39.756-12.19-60.275 0-21.802 4.06-42.105 12.19-60.914Zm562.34 214.166-82.71-115.423c11.11-3.42 20.94-7.481 29.49-12.183 9.41-5.984 17.1-12.61 23.09-19.877 6.83-8.122 11.75-16.885 14.74-26.29 3.85-10.26 5.78-21.802 5.78-34.626 0-14.962-2.57-28.427-7.7-40.397-5.13-11.543-12.61-21.588-22.44-30.138-9.41-8.122-21.38-14.534-35.91-19.237-14.96-4.702-30.78-7.053-47.45-7.053h-135.94V623.8h131.45c20.09 0 35.69 4.274 46.81 12.824 11.11 8.549 16.67 21.373 16.67 38.473 0 15.817-5.56 28.213-16.67 37.191-11.12 9.405-26.51 14.107-46.17 14.107h-132.09v153.892h53.22V773.843h67.33l75.02 106.444 63.48.004Zm109.65-305.861h-59.63l119.26 185.311v121.192h58.35V758.46l-117.98-184.03Zm237.89 0H1956l-70.54 100.674 31.42 42.321 94.9-142.995Zm289.84 60.917c-5.56-11.97-13.26-22.657-23.09-32.062-10.26-8.977-22.44-16.03-36.55-21.16-15.39-4.702-31.63-7.053-48.73-7.053h-119.9v48.091h115.42c19.24 0 35.27 4.702 48.09 14.108 11.97 8.977 17.95 22.656 17.95 41.037 0 16.672-5.77 30.138-17.31 40.397-12.39 9.832-28.64 14.748-48.73 14.748h-115.42v146.842h53.22V782.19h60.27c15.82 0 31.85-2.351 48.09-7.053 14.97-4.702 27.79-11.328 38.48-19.877 11.11-8.55 19.88-19.451 26.29-32.703 6.41-12.824 9.62-27.786 9.62-44.885 0-16.244-2.57-30.356-7.7-42.325Zm244.94-10.26h96.82v-50.015h-247.51v50.015h150.69Zm-53.86 50.017h53.86v205.189h-53.86V675.104Zm333.43 156.454c-6.41-1.282-12.4-3.206-17.96-5.771-11.96-5.558-22.44-13.252-31.41-23.084-8.55-8.977-15.39-20.091-20.52-33.343-4.71-13.252-7.06-26.718-7.06-40.397v-3.206c0-14.107 2.35-27.786 7.06-41.038 5.55-13.679 12.39-24.58 20.52-32.702 8.55-9.832 18.8-17.313 30.77-22.443 7.27-3.42 13.47-5.557 18.6-6.412v-48.091c-14.96 2.137-28.21 5.771-39.76 10.9-18.8 8.123-34.84 19.023-48.09 32.703-13.25 13.679-23.72 29.923-31.42 48.731-7.69 18.809-11.54 38.473-11.54 58.992v3.206c0 20.947 3.85 40.611 11.54 58.993 6.84 18.382 17.1 34.412 30.78 48.092 13.68 14.107 29.71 25.007 48.09 32.702 11.55 5.13 25.01 8.763 40.4 10.9v-48.732Zm174.41-103.876v-1.924c0-20.947-3.85-40.611-11.54-58.993-7.7-18.808-18.17-35.053-31.42-48.731-12.82-13.679-28.64-24.367-47.45-32.062-10.69-5.129-23.73-8.763-39.11-10.9v48.732l7.69 2.565c3.85 1.283 6.84 2.352 8.98 3.206 11.97 5.558 22.44 13.252 31.42 23.084 8.55 8.978 15.39 20.092 20.52 33.343 4.7 13.252 7.05 26.718 7.05 40.397v3.206c0 14.108-2.35 27.786-7.05 41.038-5.56 13.679-12.4 24.58-20.52 32.703-8.55 9.831-18.81 17.313-30.78 22.442a82.356 82.356 0 0 1-17.32 5.771v48.733c12.83-1.71 25.65-5.344 38.48-10.902 17.52-7.266 33.55-18.167 48.09-32.702 14.11-14.961 24.58-31.205 31.42-48.731 7.69-18.809 11.54-38.473 11.54-58.992v-1.283Z" />
            </svg>
          </a>
          <div>&nbsp;</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{meta.title ? `${meta.title} - Inertia.js` : `Inertia.js - The Modern Monolith`}</title>
        {meta.description && <meta type="description" content={meta.description} />}
        {meta.twitterCardImage && <meta name="twitter:card" content="summary_large_image" />}
        {meta.twitterCardImage && <meta name="twitter:site" content="@reinink" />}
        {meta.twitterCardImage && <meta name="twitter:creator" content="@reinink" />}
        {meta.twitterCardImage && (
          <meta name="twitter:title" content={`Inertia.js - ${meta.title ? meta.title : 'The Modern Monolith'}`} />
        )}
        {meta.twitterCardImage && <meta name="twitter:description" content={meta.description} />}
        {meta.twitterCardImage && <meta name="twitter:image" content={meta.twitterCardImage} />}
      </Head>
      <div onClick={() => setShowMobileNav(false)} className="font-sans leading-none text-gray-800 antialiased">
        <div className="text-md flex flex-wrap items-center justify-center gap-3 bg-[#fde9b1] px-6 py-4 font-medium">
          <div>🥳 Inertia.js v1.0 has been released!</div>
          <div className="flex gap-2">
            <Link
              href="/upgrade-guide"
              className="whitespace-nowrap rounded-full bg-orange-500 px-3 py-1 text-xs leading-tight text-white hover:bg-orange-600"
            >
              Upgrade guide
            </Link>
            <a
              href="https://legacy.inertiajs.com"
              className="whitespace-nowrap rounded-full bg-orange-500 px-3 py-1 text-xs leading-tight text-white hover:bg-orange-600"
            >
              Legacy docs
            </a>
          </div>
        </div>
        <div className="text-white" style={{ background: 'linear-gradient(to right, #9553e9, #6d74ed)' }}>
          <div className="relative mx-auto max-w-6xl px-6 md:px-12 xl:px-0">
            <HeaderBackground />
            <Header />
            {meta.hero && <Hero />}
          </div>
        </div>

        {meta.sponsor && <Sponsors />}

        <div className="mx-auto flex max-w-6xl py-12 md:px-12 md:py-24 xl:px-0">
          <Nav className="hidden flex-shrink-0 border-r md:block md:w-48 lg:w-56" />
          <div
            className="flex-1 overflow-hidden px-6 text-lg leading-relaxed md:pl-12 md:pr-0 lg:pl-16 xl:pl-16 xl:pr-20"
            id="top"
          >
            <CodeTabContext.Provider value={[codeTabs, setCodeTabs]}>{children}</CodeTabContext.Provider>
          </div>
          <div className="relative -mt-8 hidden w-44 flex-shrink-0 xl:block">
            <div className="sticky top-0 pt-8">
              {meta.links && (
                <div className="mb-12">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">On this page</div>
                  <ul>
                    {meta.links.map((link, index) => (
                      <li className="mt-4" key={index}>
                        <a href={link.url} className="font-medium text-gray-700 hover:text-blue-700 hover:underline">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">Our partners:</div>
              <a className="block w-3/4" href="https://forge.laravel.com" title="Laravel Forge">
                <svg className="h-auto w-full" viewBox="0 0 217.38 39.97">
                  <path
                    fill="#19b59b"
                    d="M77.94.32c4.13 0 6.03.74 7.2 2.22 1.68 2.22 2.64 6.66-.11 17.55S79.2 35.3 76.36 37.64c-1.9 1.48-4.23 2.22-8.36 2.22H54.8c-4.13 0-6.13-.74-7.2-2.22-1.68-2.22-2.63-6.66.22-17.55 2.75-10.9 5.92-15.23 8.78-17.55C58.49 1.06 60.8.32 64.94.32h13zM58.7 30.24c.21.32.74.42 2.43.42h5.08c1.69 0 2.32-.1 2.75-.42.52-.42 1.48-1.48 3.59-10.15 2.22-8.67 1.8-9.73 1.48-10.15-.21-.32-.74-.42-2.43-.42h-4.97c-1.7 0-2.33.1-2.75.42-.53.42-1.48 1.48-3.6 10.15-2.32 8.77-1.9 9.73-1.58 10.15zm51.28-3.17c-.42-.53-.85-.74-3.38-.74h-4.97c-.53 0-1.06.42-1.17.95L97.61 38.9c-.1.53-.64.95-1.16.95H86.19c-.53 0-.85-.42-.74-.95l9.4-37.64c.11-.53.64-.95 1.17-.95h24.1c3.92 0 6.03.53 7.2 2 1.27 1.8 1.69 3.7.32 9.2-1.8 7.4-4.55 9.52-9.3 10.47v.1c3.7.96 5.7 2.23 4.43 7.94-.74 3.27-1.27 6.55-1.58 8.77-.11.53-.64 1.06-1.17 1.06h-10.46c-.43 0-.85-.32-.74-.85.31-2.43.74-4.86 1.37-7.93.42-2.85.21-3.38-.21-4.01zm-.74-9.3c2.22 0 2.85-.11 3.28-.43.74-.53 1.26-1.48 1.8-3.8s.42-3.18 0-3.7c-.32-.32-.85-.43-3.07-.43h-5.5c-.53 0-1.06.42-1.16.95L103 16.92c-.1.53.21.95.74.95h5.5v-.1zM160.94 0c4.23 0 6.45.53 7.72 2 1.48 1.8 2 4.56.84 10.69-.1.53-.63.95-1.16.95h-9.83c-.53 0-.85-.42-.74-.85.42-2.43-.1-2.75-.43-3.17-.2-.32-.63-.42-2.43-.42h-5.07c-1.8 0-2.33.1-2.75.42-.64.53-1.8 2.33-3.7 10.36s-1.59 9.94-1.27 10.47c.21.32.74.42 2.54.42h5.39c1.59 0 2.22-.1 2.64-.42.53-.42 1.59-1.48 2.22-4.33l.1-.32h-7.6c-.53 0-.85-.43-.74-.95l1.48-6.35c.1-.53.63-.95 1.16-.95h18.3c.52 0 .84.42.73.95l-.95 3.91c-2.22 9.63-4.86 13-7.61 15.23-2.01 1.7-4.87 2.33-8.57 2.33H138c-4.13 0-6.14-.74-7.3-2.33-1.8-2.33-2.75-6.66-.1-17.66s5.7-15.43 8.56-17.65C141.06.74 143.39 0 147.51 0h13.43zm41.23 39.97h-31.6c-.54 0-.85-.43-.75-.96L178.7.95c.1-.53.64-.95 1.17-.95h36.79c.63 0 .95.63.53 1.27-1.59 2.54-7.72 7.93-14.6 7.93H189.8c-.52 0-1.05.42-1.16.95l-.95 4.23c-.1.53.21.95.74.95h17.23c.53 0 .85.42.74.95l-1.48 6.66c-.1.53-.63.95-1.16.95h-17.23c-.53 0-1.06.43-1.17.96l-1.16 4.86c-.1.53.21.95.74.95h19.35c.53 0 .84.42.74.95l-1.7 7.3c-.1.63-.63 1.06-1.16 1.06zM50.24.32H6.9c-.53 0-1.05.42-1.16.95l-1.06 3.8c-.1.43.1.75.43.96 1.69.53 10.78.74 9.4 5.81l-.31 1.38-3.7 13.85-.32 1.37c-1.37 5.08-6.24 5.29-8.25 5.82-.42.1-.74.52-.84.95L.02 39c-.1.53.21.96.74.96h17.66c.53 0 1.05-.43 1.16-.96l3.17-12.26c.1-.53.64-.95 1.16-.95h11.32c.53 0 1.06-.43 1.16-.95l1.7-6.56c.1-.53-.22-.95-.75-.95H26.03c-.53 0-.85-.42-.74-.95l1.59-5.92c.1-.53.63-.95 1.16-.95h17.02c.53 0 1.06-.43 1.16-.96l4.55-7.19c.21-.63 0-1.05-.53-1.05z"
                  />
                </svg>
              </a>
              <div className="mt-12 border-t pt-12" id="ad" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
