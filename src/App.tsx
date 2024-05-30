import sensorData from './data/river-sensor-data.json';
import { IMessages } from './types/types';
import MessageLayoutWithErrorBoundary from './components/Messages/MessageLayout';

function App() {
  return (
    <div className="p-2 sm:p-6 md:p-8 lg:p-12">
      <MessageLayoutWithErrorBoundary source={sensorData as IMessages}>
        <h1 className="text-base font-semibold text-slate-600 md:text-xl">
          River Sensors - All Messages
        </h1>
      </MessageLayoutWithErrorBoundary>
    </div>
  );
}

export default App;
