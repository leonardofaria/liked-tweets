import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex max-w-4xl mx-auto">
      <aside className="hidden md:block w-64 relative flex-shrink-0">
        <div className="sticky top-0 pt-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="328 355 335 276"
              height="36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 630, 425    A 195, 195 0 0 1 331, 600    A 142, 142 0 0 0 428, 570    A  70,  70 0 0 1 370, 523    A  70,  70 0 0 0 401, 521    A  70,  70 0 0 1 344, 455    A  70,  70 0 0 0 372, 460    A  70,  70 0 0 1 354, 370    A 195, 195 0 0 0 495, 442    A  67,  67 0 0 1 611, 380    A 117, 117 0 0 0 654, 363    A  65,  65 0 0 1 623, 401    A 117, 117 0 0 0 662, 390    A  65,  65 0 0 1 630, 425    Z"
                style={{ fill: '#3BA9EE' }}
              />
            </svg>
          </a>
        </div>
      </aside>
      <main className="md:border-l md:border-r border-gray-300">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
