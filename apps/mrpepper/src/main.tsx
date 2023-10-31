import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { Routers } from '@mrpepper/react-router';
import { locales, routes } from './assets/routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7474f6cc',
            colorInfo: '#7474f6cc',
            // fontSize: 15,
            // colorTextBase: '#ffffff',
            // colorBgBase: '#303030',
          },
          components: {
            // Button: {
            //   controlOutline: 'rgba(248, 248, 248, 0.41)',
            // },
          },
        }}
      >
        <BrowserRouter>
          <Routers routes={routes} locales={locales} />
        </BrowserRouter>
      </ConfigProvider>
    </Suspense>
  </StrictMode>
);
