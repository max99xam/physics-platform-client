import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';

// configuration of custom bootstrap on next.js
// https://www.mikealche.com/software-development/setting-up-bootstrap-sass-on-next-js
// https://www.ravsam.in/blog/setup-and-customize-bootstrap-in-nextjs/

// import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import '../styles/global.scss';
import '../styles/github-markdown.css';

import { Provider } from 'react-redux';
import store, { persistor } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Place this in the pages/_app.js file
  // React.useEffect(() => {
  //   import('bootstrap/dist/js/bootstrap');
  // }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>Eng</title>
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
            <link
              rel='stylesheet'
              href='https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css'
              integrity='sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc'
              crossOrigin='anonymous'
            />
          </Head>

          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

// export default MyApp;
// // export default wrapper.withRedux(MyApp);