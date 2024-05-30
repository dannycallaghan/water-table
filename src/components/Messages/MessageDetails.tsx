import formatcoords from 'formatcoords';
import { formatDateTime, parseJWT } from '../../lib/utils';
import { IMessage } from '../../types/types';
import GoogleMap from '../GoogleMap';
import MessageDirectionIcon from './MessageDirectionIcon';
import { Dispatch, SetStateAction, memo } from 'react';

const MessageDetails = memo(function MessageDetails(props: {
  message: IMessage;
  handleClose: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="custombp:items-start fixed left-0 top-0 z-50 flex h-[100vh] w-full justify-center overflow-scroll bg-[#000000] bg-opacity-50 text-left md:items-center">
      <div className="relative mx-2 w-full bg-white p-5 md:w-4/5">
        <div
          className="absolute right-6 top-6 cursor-pointer hover:text-red-800"
          onClick={() => props.handleClose(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-base font-semibold text-gray-900">Message</h2>
        <div className="mb-4">
          <div className="mb-2 flex flex-row gap-2">
            <dl className="flex flex-grow basis-1/2 flex-col">
              <dt className="text-sm text-gray-500">ID</dt>
              <dd className="text-sm text-gray-900">{props.message.id}</dd>
            </dl>
            <dl className="mb-2 flex flex-grow basis-1/2 flex-col">
              <dt className="text-sm text-gray-500">Sensor ID</dt>
              <dd className="text-sm text-gray-900">
                {props.message.sensorId}
              </dd>
            </dl>
          </div>
          <div className="mb-2 flex flex-row">
            <dl className="flex flex-grow basis-1/2 flex-col">
              <dt className="text-sm text-gray-500">Received (UTC)</dt>
              <dd className="text-sm text-gray-900">
                {formatDateTime(props.message.transmittedAt.iso as string)}
              </dd>
            </dl>
            <dl className="flex flex-grow basis-1/2 flex-col">
              <dt className="text-sm text-gray-500">Direction</dt>
              <dd className="text-sm text-gray-900">
                <MessageDirectionIcon direction={props.message.direction} />
              </dd>
            </dl>
          </div>
          <div className="flex flex-row">
            <dl className="flex flex-grow flex-col">
              <dt className="text-sm text-gray-500">Size</dt>
              <dd className="text-sm text-gray-900">{props.message.bytes} B</dd>
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="basis-1/2">
            <p className="my-2 text-sm text-gray-500">
              Location:{' '}
              <span className="text-gray-900">
                {formatcoords(
                  Number(props.message.latitude),
                  Number(props.message.longitude)
                ).format()}
              </span>
            </p>
            <GoogleMap
              pins={[
                {
                  lat: props.message.latitude as string,
                  lng: props.message.longitude as string,
                  sensorId: props.message.sensorId,
                },
              ]}
              height="300px"
              width="100%"
              zoom={8}
            />
          </div>
          <div className="basis-1/2">
            <p className="my-2 text-sm text-gray-500">Payload:</p>
            <pre className="h-[300px] overflow-scroll rounded border border-gray-200 bg-gray-100 p-2 text-sm">
              {JSON.stringify(parseJWT(props.message.payload), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MessageDetails;
