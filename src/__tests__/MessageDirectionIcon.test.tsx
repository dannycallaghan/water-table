import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import MessageDirectionIcon from '../components/Messages/MessageDirectionIcon.tsx';

describe('MessageDirectionIcon', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<MessageDirectionIcon direction={'MO'} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders correctly', () => {
    const { asFragment } = render(<MessageDirectionIcon direction={'MT'} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
