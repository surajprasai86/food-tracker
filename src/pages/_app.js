import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';

export default function App({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    require('bootstrap/dist/js/bootstrap.js');
  }
  return <Component {...pageProps} />
}
