import { IRoutes } from '@mrpepper/types';
import { lazy } from 'react';

const sample = lazy(() => import('../../pages/sample/page'));
const signup = lazy(() => import('../../pages/signup/page'));

export const routes: IRoutes[] = [
  {
    path: 'sample',
    element: sample,
  },
  {
    path: 'signup',
    element: signup,
  },
];

export const locales: string[] = ['en', 'vi'];
