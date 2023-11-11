import { render } from '@testing-library/react';

import { Routers } from './router';
import { BrowserRouter } from 'react-router-dom';
import { IRoutes } from '@mrpepper/types';
import { lazy } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
const Test = lazy(() => import('./test'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const App = lazy(() => import('../../../../apps/mrpepper/src/components/app/'));

jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useParams: jest.fn(),
    useHistory: jest.fn(),
  };
});

const mockRoutes: IRoutes[] = [
  {
    path: '/',
    element: Test,
  },
];

const mockLocales: string[] = ['en', 'vi'];

describe('Router', () => {
  const extra = {
    Component: App,
  };
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Routers routes={[]} locales={[]} extra={extra} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render routes successfully with params', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Routers routes={mockRoutes} locales={mockLocales} extra={extra} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
