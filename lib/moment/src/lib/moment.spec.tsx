import { render } from '@testing-library/react';

import Moment from './moment';

describe('Moment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Moment />);
    expect(baseElement).toBeTruthy();
  });
});
