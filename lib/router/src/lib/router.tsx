import { Routes, Route, Link } from 'react-router-dom';
import { Fragment, FC } from 'react';
import { IRoutes, IRoutesExtra } from '@mrpepper/types';
import { Result, Button } from 'antd';

export const Routers: FC<{
  routes: IRoutes[];
  locales: string[];
  extra: IRoutesExtra;
}> = ({ routes, locales, extra }) => {
  const Component = extra.Component;
  return (
    <Routes>
      {routes.map((route, index) => (
        <Fragment key={index}>
          {locales.map((locale: string) => {
            const Elem = route.element;

            return (
              <Route
                key={index}
                path={`/${locale}/` + route.path}
                element={
                  <Component>
                    <Elem locale={locale} />
                  </Component>
                }
              />
            );
          })}
        </Fragment>
      ))}
      <Route
        path={'*'}
        element={
          <Component>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={'/en/'}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </Component>
        }
      />
    </Routes>
  );
};
