import { LazyExoticComponent, FC } from 'react';

export interface ILocale {
  locale: string;
}

export interface IRoutes {
  path: string;
  element: LazyExoticComponent<FC<any>>;
}

export interface IRoutesExtra {
  Component: FC<any>;
}