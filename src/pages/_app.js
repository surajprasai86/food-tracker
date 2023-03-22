import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { DataProvider } from "../../components/DataContext";
// import 'bootstrap/dist/js/bootstrap.js';

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
