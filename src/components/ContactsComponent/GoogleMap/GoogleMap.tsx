import { useState, FC } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import s from "./GoogleMap.module.scss";
import Image from "next/image";
import grandpa from "../../../../public/images/grandpas/Grandpa1.png";
import { CustomMarker } from "./CustomMarker";
type GoogleMapProps = {
  googleMapWrapperRef: React.RefObject<HTMLDivElement>;
};

const GoogleMap: FC<GoogleMapProps> = ({ googleMapWrapperRef }) => {
  const position = { lat: 51.96278, lng: 31.1626 };
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_DEFAULT_API_KEY";
  const [open, setOpen] = useState<boolean>(false);

  return (
    <APIProvider apiKey={apiKey}>
      <div ref={googleMapWrapperRef} className={s.googleMapWrapper}>
        <Map
          defaultCenter={position}
          defaultZoom={17}
          mapId={process.env.NEXT_PUBLIC_MAP_ADI}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            {/* <Pin
              background={"rgb(194, 191, 183)"}
              borderColor={"rgb( 97, 97, 97)"}
              glyphColor={"rgb(63, 85, 64)"}
              scale={2}
            ></Pin> */}
            <CustomMarker />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <Image
                src={grandpa}
                alt=""
                width={75}
                height={75}
                style={{ transform: "translateX(50%)" }}
              />
              <p style={{ fontSize: 16 }}>Welcome to Sadyba!</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
