import { Children, useRef, useState, useEffect, isValidElement, cloneElement } from "react";

export const Map = ({
  style,
  children,
  onClick,
  onIdle,
  onLoad,
  ...options
}) => {
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {...options}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options.center]);

  useEffect(() => {
    if (map) {
      if (!loaded && onLoad) {
        onLoad();
     }
      setLoaded(true);
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} id="map"/>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}