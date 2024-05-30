import sensorData from '../data/river-sensor-data-test.json';
import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import { getDataCoords } from '../lib/utils.ts';
import GoogleMap from '../components/GoogleMap.tsx';

describe('GoogleMap', () => {
  test('renders correctly', () => {
    const { asFragment } = render(
      <GoogleMap
        pins={getDataCoords(sensorData.slice(0, 3))}
        height="225px"
        width="100%"
        zoom={5}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
