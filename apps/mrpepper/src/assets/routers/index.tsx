import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import routes from './routes';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Fragment key={index}>
            <Route path={'/en/' + route.path} element={route.element} />
            <Route
              path={'/vi/' + route.path}
              element={route.element}
            />
          </Fragment>
        ))}
        <Route path={'*'} element={<Navigate to="/en/" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
