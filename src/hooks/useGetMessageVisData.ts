import { useCallback } from "react";
import { IMessage, IMessages } from "../types/types";

function getKeyValue<T, K extends keyof T>(obj: T, key: K) {
  // @ts-expect-error Unresolved type/indexing error
  return obj[key].value;
} 

function useGetMessageVisData(source: IMessages) {
  const data = source;

  const getAverageAcrossSensors = useCallback(function getAverageAcrossSensors(key: string) {

    const withCounts = data.reduce((a: {[key: string]: {value: number, count: number}}, i: IMessage) => {
      if (!a[i.sensorId]) {
          a[i.sensorId] = { value: 0, count: 0 };
      }
      a[i.sensorId].value += Number(getKeyValue(i.decodedPayload, key as never)) || 0;
      a[i.sensorId].count += 1;
      return a;
    }, {});

    return Object.keys(withCounts).map(message => ({
      id: message,
      average: Number((withCounts[message].value / withCounts[message].count).toFixed(2)),
    }));

  }, [data]);

  return getAverageAcrossSensors;
}

export default useGetMessageVisData;