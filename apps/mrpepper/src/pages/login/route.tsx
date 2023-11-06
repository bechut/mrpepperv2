import { lazy } from 'react';

const Page = lazy(() => import('./page'));

export default {
  path: 'login',
  element: Page,
};
