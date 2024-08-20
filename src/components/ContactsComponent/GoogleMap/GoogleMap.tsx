import { useEffect, useState, FC } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import s from "./GoogleMap.module.scss";
import Image from "next/image";
import grandpa from '../../../../public/images/grandpas/Grandpa1.png';
import { CustomMarker } from "./CustomMarker";

type GoogleMapProps = {
  googleMapWrapperRef: React.RefObject<HTMLDivElement>;
};

const GoogleMap: FC<GoogleMapProps> = ({ googleMapWrapperRef }) => {
  const position = { lat: 51.96278, lng: 31.1626 };
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_DEFAULT_API_KEY";

  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <APIProvider apiKey={apiKey}>
      <div
        ref={googleMapWrapperRef}
        className={`${s.googleMapWrapper} ${isLoaded ? s.mapLoaded : ""}`} // Добавляем класс для анимации после загрузки
      >
        {isLoaded ? (
          <Map
            defaultCenter={position}
            defaultZoom={17}
            mapId={process.env.NEXT_PUBLIC_MAP_ADI}
          >
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <CustomMarker />
            </AdvancedMarker>

            {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <Image
                  src={grandpa}
                  alt="grandpa"
                  width={75}
                  height={75}
                  style={{ transform: 'translateX(50%)' }}
                />
                <p style={{ fontSize: 16 }}>Welcome to Sadyba!</p>
              </InfoWindow>
            )}
          </Map>
        ) : (
          <p>Loading map...</p> //
        )}
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
