import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { Toaster } from 'react-hot-toast';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import '../theme/fonts/fonts.css';
import { Provider as WagmiProvider } from "wagmi";


import createEmotionCache from '../utility/createEmotionCache';
import { NextPage } from 'next';
import Router from 'next/router';
import nProgress from 'nprogress';
import { createTheme } from '../theme';
import { walltConnectors } from '../utility/walletUtils';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPage;
}

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  // get layout fix: https://dev.to/ofilipowicz/next-js-per-page-layouts-and-typescript-lh5
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page)


  React.useEffect(() => {
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeProvider
                theme={createTheme({
                  responsiveFontSizes: settings.responsiveFontSizes,
                  mode: settings.theme,
                })}
              >
                <CssBaseline />
                <Toaster position="top-center" />
                <WagmiProvider autoConnect connectors={walltConnectors}>
                  {getLayout(<Component {...pageProps} />)}
                </WagmiProvider>
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default MyApp;