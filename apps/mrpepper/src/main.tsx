import { StrictMode, Suspense, lazy } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';

import Routers from './assets/routers';
import { reduxStore } from './assets/redux/store';

const AppComponent = lazy(() => import('./app/components/app'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7474f6cc',
          },
          components: {
            Layout: {},
            Menu: {
              // if you use "dark" theme on menu
            },
            Button: {
              colorLink: '#7474f6cc',
              colorLinkHover: '#7474f6',
            },
          },
        }}
      >
        <Provider store={reduxStore}>
          <AppComponent>
            <Routers />
          </AppComponent>
        </Provider>
      </ConfigProvider>
    </Suspense>
  </StrictMode>
);
