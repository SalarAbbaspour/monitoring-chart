import '../styles/globals.css'
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'lD5gKZap0MGnqOUZvjP8bs7rTsAQ1SYxe3S9igg4';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'o9l30yE3D4KSnAQcusMukK2adkwlvRLAaA45vNqt';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
function MyApp({ Component, pageProps }) {
  return <Component  {...pageProps} />
}

export default MyApp
