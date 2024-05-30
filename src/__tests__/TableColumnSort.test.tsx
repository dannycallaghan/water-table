import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import TableColumnSort from '../components/TableColumnSort.tsx';

describe('TableColumnSort', () => {
  const sortAction = () => {};
  const sortValues = { type: 'number', key: 'bytes' };
  test('renders correctly', () => {
    const sortActive = true;
    const { asFragment } = render(
      <TableColumnSort
        action={sortAction}
        values={sortValues}
        active={sortActive}
      >
        <div></div>
      </TableColumnSort>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders correctly', () => {
    const sortActive = false;
    const { asFragment } = render(
      <TableColumnSort
        action={sortAction}
        values={sortValues}
        active={sortActive}
      >
        <div></div>
      </TableColumnSort>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
