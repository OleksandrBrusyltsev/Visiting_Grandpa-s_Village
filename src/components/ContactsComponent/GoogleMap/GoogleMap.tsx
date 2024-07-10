import { useState } from "react";
import {
  APIProvider,
  Map,
   AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const GoogleMap = () => {
  const position = { lat: 51.96278, lng: 31.1626 };
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_DEFAULT_API_KEY";
  const [open, setOpen] = useState<boolean>(false);

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "547px", width: "100%" }}>
        <Map
          defaultCenter={position}
          zoom={17}
          center={position}
          mapId={process.env.NEXT_PUBLIC_MAP_ADI}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"rgb(194, 191, 183)"}
              borderColor={"rgb( 97, 97, 97)"}
              glyphColor={"rgb(63, 85, 64)"}
              scale={2}
            ></Pin>
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Welcome to sadyba!</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
