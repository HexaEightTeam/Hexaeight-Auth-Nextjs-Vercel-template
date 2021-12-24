import '../styles/globals.css'
import { useEffect } from 'react'

async function fetcher(url) {
  const res = await fetch(url);
  const txt = await res.text();
  return txt;
}

function MyApp({ Component, pageProps }) {
 useEffect(() => {
    setInterval(() => {
	fetcher('/login/extendSession');
    },180000)
  },[])

  return <Component {...pageProps} />
}

export default MyApp
