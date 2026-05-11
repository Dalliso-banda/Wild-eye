import React, { useState, useEffect } from 'react';
import Layout from '../layouts/MobileLayout';
import MapBox from '../components/MapBox';
import { Spinner, Button } from 'react-bootstrap';
import { useLocationSync } from '../hooks/useLocationSync';
import { socket } from "../socket.js"; // Import the instance

export default function MapPage() {
    const users = useLocationSync(socket); // This will give you the array of nearby users from the backend
  const [coords, setCoords] = useState({ long: 28.3, lat: -15.4 });
  const [isLoading, setIsLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);

    console.log(users,'from mapps ')
  const requestLocation = () => {
    setPermissionError(false);
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ long: pos.coords.longitude, lat: pos.coords.latitude });
        setIsLoading(false);
      },
      (err) => {
        console.error("Manual Request Error:", err);
        setPermissionError(true);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      setIsLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({ long: pos.coords.longitude, lat: pos.coords.latitude });
        setIsLoading(false);
        setPermissionError(false);
      },
      (err) => {
        console.error("Tracking error:", err);
        // If it's a permission denied error (code 1), show the button
        if (err.code === 1) setPermissionError(true);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <Layout>
      <div style={{ position: 'relative', height: '100%' }}>
        {isLoading ? (
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="grow" variant="danger" />
            <span className="ms-2 mt-3 fw-bold">Acquiring Satellite Lock...</span>
          </div>
        ) : (
          <>
            <MapBox long={coords.long} lat={coords.lat} nearby={users} />
            
            {/* Show this if the precise location is blocked or failing */}
            {permissionError && (
              <div className="position-absolute top-50 start-50 translate-middle text-center w-75 p-4 bg-dark text-white rounded shadow-lg" style={{ zIndex: 1000 }}>
                <p>Precise location is required for Wild-Eye.</p>
                <Button variant="danger" onClick={requestLocation}>
                  Grant Access
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}