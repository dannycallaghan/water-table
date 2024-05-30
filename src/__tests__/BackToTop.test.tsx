import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import BackToTop from '../components/BackToTop.tsx';

describe('BackToTop', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<BackToTop />);
    expect(asFragment()).toMatchSnapshot();
  });
});
