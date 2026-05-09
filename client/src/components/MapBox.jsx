import React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const STADIA_API_KEY = 'b695c1d2-16f3-4673-94b5-d0cdeb9c8679';

export default function MapPage() {
  return (
   

      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Map initialViewState="{{ longitude: 28.3, latitude: -15.4, zoom: 12 }}"
         mapStyle={`https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${STADIA_API_KEY}`}>
          
        </Map>
        
        
        <div style={{ position: 'absolute', top: 20, width: '100%', textAlign: 'center' }}>
            <span className="badge bg-danger p-2 shadow">ACTIVE TRACKING</span>
        </div>
      </div>


  );
}