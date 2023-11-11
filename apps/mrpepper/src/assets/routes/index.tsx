import { IRoutes } from '@mrpepper/types';
import { lazy } from 'react';

const sample = lazy(() => import('../../pages/sample/page'));

export const routes: IRoutes[] = [
  {
    path: 'sample',
    element: sample,
  },
];

export const locales: string[] = ['en', 'vi'];
