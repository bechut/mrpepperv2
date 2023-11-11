import { StrictMode, Suspense, lazy } from 'react';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Routers } from '@mrpepper/router';

import { locales, routes } from './assets/routes';
import { lang } from './assets/languages';
import { Provider } from 'react-redux';
import { store } from './assets/redux';

const AppComponent = lazy(() => import('./components/app'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <I18nextProvider i18n={lang}>
      <Provider store={store}>
        <Suspense fallback={<div>Loading</div>}>
          <BrowserRouter>
            <Routers
              locales={locales}
              routes={routes}
              extra={{ Component: AppComponent }}
            />
          </BrowserRouter>
        </Suspense>
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
