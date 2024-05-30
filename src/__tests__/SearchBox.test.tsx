import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import SearchBox from '../components/SearchBox.tsx';

describe('SearchBox', () => {
  test('renders correctly', () => {
    const handleSearch = () => {};
    const { asFragment } = render(
      <SearchBox term={'Hello'} handleSearch={handleSearch} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
