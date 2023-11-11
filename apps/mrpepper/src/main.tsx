import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Routers } from '@mrpepper/router';
import { locales, routes } from './assets/routes';

console.log(routes)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <Routers locales={locales} routes={routes} />
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
