import sensorData from '../data/river-sensor-data-test.json';
import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import MessageDetails from '../components/Messages/MessageDetails.tsx';
import useDecodePayloadOnce from '../hooks/useDecodePayloadOnce.ts';
import { IMessage } from '../types/types.ts';

describe('MessageDetails', () => {
  test('renders correctly', () => {
    const setState = () => {};
    const data = useDecodePayloadOnce(sensorData);
    const { asFragment } = render(
      <MessageDetails handleClose={setState} message={data[0] as IMessage} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
