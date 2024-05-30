import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import FilterReset from '../components/FilterReset.tsx';

describe('FilterReset', () => {
  test('renders correctly', () => {
    const handleReset = () => {};
    const { asFragment } = render(<FilterReset handleReset={handleReset} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
