import { IRoutes } from '@mrpepper/types';
import { lazy } from 'react';

const App = lazy(() => import('../../app/app'));

export const routes: IRoutes[] = [
  {
    path: 'sample',
    element: App,
  },
];

export const locales: string[] = ['en', 'vi'];
