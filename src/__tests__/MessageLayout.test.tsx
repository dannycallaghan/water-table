import sensorData from '../data/river-sensor-data-test.json';
import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import MessageLayout from '../components/Messages/MessageLayout.tsx';
import { IMessages } from '../types/types.ts';

describe('MessageLayout', () => {
  test('renders correctly', () => {
    const { asFragment } = render(
      <MessageLayout source={sensorData as IMessages}>
        <h1>Messages</h1>
      </MessageLayout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
