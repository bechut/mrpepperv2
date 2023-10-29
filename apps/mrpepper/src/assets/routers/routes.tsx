import { lazy } from 'react';

const SamplePage = lazy(() => import('../../app/pages/sample/page'));

export default [
  {
    path: 'sample',
    element: <SamplePage />,
  },
];
