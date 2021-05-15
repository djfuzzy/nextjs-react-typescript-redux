import React, { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import { AppInitialProps } from 'next/app';

import Layout from '../components/Layout';
import store from '../store';
import initAuth from '../utils/initAuth';

import '../styles/globals.scss';
import './_app.scss';

type AppProps = {
  Component: ComponentType<AppInitialProps>;
  pageProps: AppInitialProps;
};

initAuth();

const Application: NextPage<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default Application;
