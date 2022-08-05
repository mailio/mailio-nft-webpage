// import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { Toaster } from 'react-hot-toast';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import '../theme/fonts/fonts.css';
import '../theme/noise.css';


import createEmotionCache from '../utility/createEmotionCache';
import { NextPage } from 'next';
import Router from 'next/router';
import nProgress from 'nprogress';
import { createTheme } from '../theme';
import { FC, useEffect } from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { Web3Provider } from '../contexts/web3modal-context';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { LoadingMailio } from '../components/loading-mailio';
import ErrorBoundary from '../components/widgets/error-boundary';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { FINGERPRINT_ID } from '../config';

type MyAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
}

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const MyApp: FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  // get layout fix: https://dev.to/ofilipowicz/next-js-per-page-layouts-and-typescript-lh5
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page)


  useEffect(() => {
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <GoogleReCaptchaProvider reCaptchaKey={FINGERPRINT_ID!}>
          <AuthProvider>
            <FpjsProvider 
              loadOptions={{
                apiKey: "5YAI0Mwov7vxYtqEVfct"
              }}
            >
            <Web3Provider>
              <SettingsProvider>
                <SettingsConsumer>
                  {({ settings }) => (
                    <ThemeProvider
                      theme={createTheme({
                        responsiveFontSizes: true,
                        mode: settings.theme,
                      })}
                    >
                      <CssBaseline />
                      <Toaster position="top-center" />
                      <ErrorBoundary>
                        <AuthConsumer>
                          {
                            // making sure that we check the authentiation status first before children renedering
                            (auth) => !auth.isInitialized ? (<LoadingMailio />) :
                              getLayout(<Component {...pageProps} />)
                          }
                        </AuthConsumer>
                      </ErrorBoundary>
                    </ThemeProvider>
                  )}
                </SettingsConsumer>
              </SettingsProvider>
            </Web3Provider>
            </FpjsProvider>
          </AuthProvider>
          </GoogleReCaptchaProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default MyApp;