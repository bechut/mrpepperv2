import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import Routers from './assets/routers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <Routers />
    </Suspense>
  </StrictMode>
);
