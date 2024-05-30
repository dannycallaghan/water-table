import { parseJWT } from '../lib/utils';
import { IMessages } from '../types/types';

function useDecodePayloadOnce(source: IMessages): IMessages {
  return source.map(message => ({
    ...message,
    decodedPayload: parseJWT(message.payload),
  }));
}

export default useDecodePayloadOnce;