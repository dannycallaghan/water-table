import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import TablePaginationControl from '../components/TablePaginationControl.tsx';
import { defaultMessageDataOptions } from '../hooks/useGetMessageData.ts';

describe('TablePaginationControl', () => {
  test('renders correctly', () => {
    const handlePaginationChange = () => {};
    const { asFragment } = render(
      <TablePaginationControl
        initialDataLength={100}
        dataLength={20}
        hideDisplaySelect
        options={{ ...defaultMessageDataOptions.pagination }}
        filteredDataLength={10}
        handlePaginationChange={handlePaginationChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
