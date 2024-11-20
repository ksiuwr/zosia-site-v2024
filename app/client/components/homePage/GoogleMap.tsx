import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { CenteredContainer } from "../containers/CenteredContainer";

interface GoogleMapProps {
  address: string;
}

export const GoogleMap = ({ address }: GoogleMapProps) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>();

  useEffect(() => {
    if (!placesLib || !map) return;

    const placesService = new placesLib.PlacesService(map);

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
            map?.setCenter(newPos);
          }
        }
      },
    );
  }, [address, map, placesLib]);

  return (
    <CenteredContainer>
      <div className="h-[600px] w-full">
        <Map
          // By default the map is centered on Wrocław
          defaultCenter={{ lat: 51.1108914, lng: 17.0505023 }}
          defaultZoom={12}
          gestureHandling="cooperative"
          disableDefaultUI={true}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </Map>
      </div>
    </CenteredContainer>
  );
};
