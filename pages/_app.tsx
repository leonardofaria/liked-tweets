import '../styles/globals.css'
import type { AppProps } from '../types'
import Minimal from '../components/layouts/Minimal';

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: any) => <Minimal {...pageProps} children={page} />);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp
