import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Maplocation = ({ onMapClick, initialMarker }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsb2thbG8iLCJhIjoiY2xkeXV5bWxwMHY3aTNvcjNsc3Bsc3hmdyJ9.n-Gnaro_yu9dj5PnUhNgfQ';

    const map = new mapboxgl.Map({
      container: 'map', // ID of the div element to render the map
      style: 'mapbox://styles/kalokalo/cldzyog2k000a01t401qifylc', // Mapbox base style
      center: [120.2307078878246, 16.032108026014853], // Initial map center coordinates (e.g., [-122.4194, 37.7749])
      zoom: 10, // Adjust the initial zoom level to fit the desired area
    });

    const markers = [];

    const addMarker = (lng, lat) => {
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      markers.push(marker);
    };

    const removeMarkers = () => {
      for (const marker of markers) {
        marker.remove();
      }
      markers.length = 0;
    };

    map.on('click', (e) => {
      // Get the clicked coordinates from the event
      const { lng, lat } = e.lngLat;

      addMarker(lng, lat);

      // Do something with the coordinates (e.g., log them)
      onMapClick([lng, lat]);
      console.log('Clicked coordinates:', [lng, lat]);
    });

    // Add initial markers to the map when the component mounts
    if (initialMarker && Array.isArray(initialMarker)) {
      initialMarker.forEach((markerCoords) => {
        const [lng, lat] = markerCoords;
        addMarker(lng, lat);
      });
    }

    // Clean up the map on component unmount
    return () => map.remove();
  }, [initialMarker, onMapClick]);

  // Use CSS to style the map container to fit the screen
  const mapContainerStyle = {
    width: '100%', // Use 100% of the available width
    height: '100vh', // Use 100% of the viewport height
  };

  return <div id="map" style={mapContainerStyle} />;
};

export default Maplocation;