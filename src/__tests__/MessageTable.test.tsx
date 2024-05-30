import sensorData from '../data/river-sensor-data-test.json';
import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import MessageTable from '../components/Messages/MessageTable.tsx';
import useDecodePayloadOnce from '../hooks/useDecodePayloadOnce.ts';

describe('MessageTable', () => {
  test('renders correctly', () => {
    const data = useDecodePayloadOnce(sensorData);
    const { asFragment } = render(<MessageTable showMap source={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
