import { IRoutes } from '@mrpepper/types';
import { lazy } from 'react';

const sample = lazy(() => import('../../pages/sample/page'));
const signup = lazy(() => import('../../pages/signup/page'));
const login = lazy(() => import('../../pages/login/page'));
const home = lazy(() => import('../../pages/home/page'));

export const routes: IRoutes[] = [
  {
    path: 'sample',
    element: sample,
  },
  {
    path: 'signup',
    element: signup,
  },
  {
    path: 'login',
    element: login,
  },
  {
    path: '',
    element: home,
  },
];

export const locales: string[] = ['en', 'vi'];
