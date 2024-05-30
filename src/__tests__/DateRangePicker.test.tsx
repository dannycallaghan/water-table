import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import DateRangePicker from '../components/DateRangePicker.tsx';

describe('DateRangePicker', () => {
  test('renders correctly', () => {
    const handleDateChange = () => {};
    const { asFragment } = render(
      <DateRangePicker handleDateChange={handleDateChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
