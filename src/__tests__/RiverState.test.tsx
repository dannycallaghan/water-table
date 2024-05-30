import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import RiverState from '../components/RiverState.tsx';

describe('RiverState', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<RiverState state={'Falling'} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders correctly', () => {
    const { asFragment } = render(<RiverState state={'Constant'} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders correctly', () => {
    const { asFragment } = render(<RiverState state={'Rising'} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
