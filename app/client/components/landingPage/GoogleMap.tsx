import React, { useEffect, useState } from "react";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

interface GoogleMapProps {
  address: string;
}

export const GoogleMap = ({ address }: GoogleMapProps) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const [placesService, setPlacesService] = useState<
    google.maps.places.PlacesService | undefined
  >(undefined);

  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [isMarkerReady, setIsMarkerReady] = useState(false);

  useEffect(() => {
    if (!placesLib || !map) return;
    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib, map]);

  useEffect(() => {
    if (!placesService) return;

    placesService.findPlaceFromQuery(
      { query: address, fields: ["geometry"] },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (results) {
            const newPos = {
              lat: results[0].geometry?.location?.lat() as number,
              lng: results[0].geometry?.location?.lng() as number,
            };
            setMarkerPosition(newPos);
            setIsMarkerReady(true);
            map?.setCenter(newPos);
          }
        }
      },
    );
  }, [placesService]);

  return (
    <div className="mx-auto h-[600px] w-full lg:w-4/6">
      <Map
        // By default the map is centered on Wrocław
        defaultCenter={{ lat: 51.1108914, lng: 17.0505023 }}
        defaultZoom={12}
        gestureHandling="cooperative"
        disableDefaultUI={true}
      >
        {isMarkerReady && <Marker position={markerPosition} />}
      </Map>
    </div>
  );
};
