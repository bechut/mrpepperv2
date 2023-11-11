import { StrictMode, Suspense, lazy } from 'react';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { Routers } from '@mrpepper/router';

import { locales, routes } from './assets/routes';
import { lang } from './assets/languages';

const AppComponent = lazy(() => import('./components/app'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <I18nextProvider i18n={lang}>
      <Suspense fallback={<div>Loading</div>}>
        <BrowserRouter>
          <Routers
            locales={locales}
            routes={routes}
            extra={{ Component: AppComponent }}
          />
        </BrowserRouter>
      </Suspense>
    </I18nextProvider>
  </StrictMode>
);
