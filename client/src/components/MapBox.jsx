import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import axios from 'axios';
import 'maplibre-gl/dist/maplibre-gl.css';

const STADIA_API_KEY = import.meta.env.VITE_STADIA_API_KEY;



export default function MapBox({ long, lat ,nearby}) {
console.log(nearby)
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
        
     {nearby.map((point, index) => (
  <Marker key={index} longitude={point.lng.toFixed(5)} latitude={point.lat.toFixed(4)} anchor="center">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* The Clickable Phone Button */}
      <a 
        href={`tel:${point.phone}`} 
        style={{
          backgroundColor: 'white',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#28a745',
          textDecoration: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          marginBottom: '5px',
          whiteSpace: 'nowrap'
        }}
      >
        📞 {point.phone}
      </a>

      {/* Your original green dot */}
      <div style={{
        width: '15px', height: '15px', 
        backgroundColor: '#28a745', border: '2px solid white',
        borderRadius: '50%', boxShadow: '0 0 10px #28a745'
      }} />

    </div>
  </Marker>
))}
       
      </Map>
      
      <div style={{ position: 'absolute', top: 10, width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
        <span className="badge bg-danger p-2 shadow-lg">
          LIVE INTEL: {lat.toFixed(4)}, {long.toFixed(4)}
        </span>
      </div>
    </div>
  );
}