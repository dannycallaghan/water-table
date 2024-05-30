import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import WaterSensorVis from '../components/WaterSensorVis.tsx';

describe('WaterSensorVis', () => {
  test('renders correctly', () => {
    const data = [
      {
        id: '1',
        average: 10,
      },
      {
        id: '2',
        average: 11,
      },
      {
        id: '3',
        average: 12,
      },
    ];
    const { asFragment } = render(
      <WaterSensorVis
        data={data}
        yLabel="battery strength (%)"
        color="steelblue"
        hoverColor="#ff0000"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
