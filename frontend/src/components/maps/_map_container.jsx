import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Map } from "./_map_component";
import { Marker } from "./_marker_component";

const renderDefaultState = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

export const MapContainer = ({spec}) => {
  spec = spec || {};
  let center = spec.center || { lat: 41.736980, lng: -111.833839 };
  let zoom = spec.zoom || 10;
  const render = spec.render || renderDefaultState;
  const onClick = spec.onClick || (() => {});
  const onIdle = spec.onIdle || (() => {});
  const style = spec.style || {
    width: "100%",
    height: "1000px"
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
      <Map 
        zoom={zoom} 
        center={center}
        style={style} 
        onClick={onClick}
        onIdle={onIdle}
      >
        {spec.coords?.map((coord, index) => (
          <Marker key={index} position={coord} />
        ))}
      </Map>
    </Wrapper>
  )
};