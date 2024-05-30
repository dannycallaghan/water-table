import { ReactNode } from 'react';
import { IMessages } from '../../types/types';
import MessageTable from './MessageTable';
import ErrorBoundary from '../../errorBoundary';
import useGetMessageVizData from '../../hooks/useGetMessageVisData';
import useDecodePayloadOnce from '../../hooks/useDecodePayloadOnce';
import WaterSensorVis from '../WaterSensorVis';

interface IProps {
  children: ReactNode;
  source: IMessages;
}

function MessageLayout(props: IProps) {
  const { children, source } = props;
  const data = useDecodePayloadOnce(source);
  const getAverageAcrossSensors = useGetMessageVizData(data);

  const messageLength = `${source.length} message${source.length !== 1 ? 's' : ''}`;
  return (
    <div>
      {children}
      <h2 className="text-sm text-slate-400">{messageLength}</h2>
      <hr className="mb-8 mt-2 h-px border-0 bg-slate-300" />
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="sm:basis-1/2">
          <WaterSensorVis
            data={getAverageAcrossSensors('height')}
            yLabel="height (M)"
            color="steelblue"
            hoverColor="#ff0000"
          />
        </div>
        <div className="sm:basis-1/2">
          <WaterSensorVis
            data={getAverageAcrossSensors('temperature')}
            yLabel="temperature (Celsius)"
            color="steelblue"
            hoverColor="#ff0000"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="sm:basis-1/2">
          <WaterSensorVis
            data={getAverageAcrossSensors('battery')}
            yLabel="battery strength (%)"
            color="steelblue"
            hoverColor="#ff0000"
          />
        </div>
        <div className="sm:basis-1/2">
          <WaterSensorVis
            data={getAverageAcrossSensors('battery')}
            yLabel="speed (M/s)"
            color="steelblue"
            hoverColor="#ff0000"
          />
        </div>
      </div>
      <hr className="my-4 h-px border-0 bg-slate-300" />
      <MessageTable source={data} showMap />
    </div>
  );
}

function MessageLayoutWithErrorBoundary(props: IProps) {
  return (
    <ErrorBoundary>
      <MessageLayout {...props} />
    </ErrorBoundary>
  );
}

export default MessageLayoutWithErrorBoundary;
