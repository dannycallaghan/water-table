import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import formatcoords from 'formatcoords';
import { memo } from 'react';
import { useCallback, useState } from 'react';

function GoogleMap(props: {
  pins: { lat: string; lng: string; sensorId: string }[];
  zoom: number;
  height: string;
  width: string;
}) {
  let position = {
    lat: Number(props.pins[0]?.lat),
    lng: Number(props.pins[0]?.lng),
  };

  if (props.pins.length > 1) {
    position = {
      lat: 51.5072,
      lng: 0.1276,
    };
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Map
          mapId={'de2fd94a6060890b'}
          defaultCenter={position}
          style={{
            width: props.width,
            height: props.height,
          }}
          defaultZoom={props.zoom}
        >
          {props.pins.map((pin, i) => (
            <PinInfoWindow key={`${pin.lat}${pin.lng}${i}`} pin={pin} />
          ))}
        </Map>
      </APIProvider>
    </>
  );
}

const PinInfoWindow = memo(function PinInfoWindow(props: {
  pin: {
    lat: string;
    lng: string;
    sensorId: string;
  };
}) {
  const { pin } = props;
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: Number(pin.lat), lng: Number(pin.lng) }}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow anchor={marker} className="w-[300px]" onClose={handleClose}>
          <p className="text-sm text-gray-500">Identifer:</p>
          <p className="text-sm text-gray-900">{pin.sensorId}</p>
          <p className="text-sm text-gray-500">Location:</p>
          <p className="text-sm text-gray-900">
            {formatcoords(Number(pin.lat), Number(pin.lng)).format()}
          </p>
        </InfoWindow>
      )}
    </>
  );
});

export default GoogleMap;
