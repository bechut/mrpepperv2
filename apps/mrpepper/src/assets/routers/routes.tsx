import { lazy } from 'react';

const SamplePage = lazy(() => import('../../app/pages/sample/page'));
const SignUpPage = lazy(() => import('../../app/pages/sign-up/page'));

export default [
  {
    path: 'sample',
    element: <SamplePage />,
  },
  {
    path: 'sign-up',
    element: <SignUpPage />,
  },
];
