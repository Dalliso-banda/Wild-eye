import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const STADIA_API_KEY = import.meta.env.VITE_STADIA_API_KEY;

console.log("Using Stadia API Key:", STADIA_API_KEY ? "Yes" : "No");

export default function MapBox({ long, lat }) {

  const [viewState, setViewState] = useState({
    longitude: long,
    latitude: lat,
    zoom: 17
  });


  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      longitude: long,
      latitude: lat,
    }));
  }, [long, lat]);

  return (
    <div style={{ width: '100%', height: '85vh', position: 'relative' }}>
      <Map
        {...viewState}
      
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={`https://tiles.stadiamaps.com/styles/alidade_satellite.json?api_key=${STADIA_API_KEY}`}
      >
      
        <Marker longitude={long} latitude={lat} anchor="center">
          <div style={{
            width: '20px', height: '20px', 
            backgroundColor: '#007bff', border: '3px solid white',
            borderRadius: '50%', boxShadow: '0 0 15px #007bff'
          }} />
        </Marker>
      </Map>
      
      <div style={{ position: 'absolute', top: 10, width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
        <span className="badge bg-danger p-2 shadow-lg">
          LIVE INTEL: {lat.toFixed(4)}, {long.toFixed(4)}
        </span>
      </div>
    </div>
  );
}