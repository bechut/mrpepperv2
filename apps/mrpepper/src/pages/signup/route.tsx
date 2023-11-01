import { lazy } from 'react';

const Page = lazy(() => import('./page'));

export default {
  path: 'signup',
  element: Page,
};
