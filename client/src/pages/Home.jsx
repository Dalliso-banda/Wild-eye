import { useState, useEffect } from 'react';
import Layout from '../layouts/MobileLayout';
import { Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserAuth';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);

 
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Success callback
    const handleSuccess = (position) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setError(null); 
    };

    // Error callback
    const handleError = (err) => {
      setError(`Location error: ${err.message}. Please enable GPS.`);
    };

    // Start watching position (updates if or when user moves day 4/4 lol ompwe moves)
    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    });

    // Cleanup: stop watching when user leaves the page
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2. Click handler (instant since coordinates are already in state)
  const handleDistressClick = async () => {
    if (!coords) {
      setError("Waiting for GPS signal... please try again in a moment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/report/distress', {
        latitude: coords.latitude,
        longitude: coords.longitude,
        user
      });

      console.log('Distress signal sent:', response.data);
      // alert(`Distress signal sent from: ${coords.latitude}, ${coords.longitude}`);
      navigate('/map');
    } catch (err) {
      console.error(err);
      setError("Failed to send distress signal. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0">Live Updates</h5>
          <span className="badge rounded-pill bg-danger animate-pulse">Live</span>
        </div>
        
        <div className="bg-light p-3 rounded-3 shadow-sm border">
          <ul className="list-unstyled mb-0">
            <li className="d-flex align-items-start mb-3">
              <div className="bg-danger rounded-circle p-2 me-3 mt-1"></div>
              <div>
                <strong className="d-block">09765578 in distress</strong>
                <small className="text-muted">9m away • Just now</small>
              </div>
            </li>
          </ul>
        </div>
      </Container>

      <Container
        className="d-flex flex-column justify-content-center align-items-center" 
        style={{ minHeight: '70vh' }}
      >
        <h1 
          className="text-center fw-bold mb-5 text-uppercase" 
          style={{ letterSpacing: '3px', color: '#4a4a4a' }}
        >
          Wild-Eye
        </h1>

        <Button
          onClick={handleDistressClick}
          disabled={loading || !coords} 
          variant="danger"
          className="rounded-circle shadow-lg d-flex flex-column justify-content-center align-items-center text-decoration-none"
          style={{ 
            width: '180px', 
            height: '180px', 
            border: '8px solid #f8d7da', 
            transition: 'transform 0.1s ease-in-out',
            cursor: !coords ? 'not-allowed' : 'pointer'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span className="fs-6">
            {!coords ? 'Searching GPS...' : loading ? 'Sending...' : 'Distress'}
          </span>
          <span className="fs-1 fw-bold">SOS</span>
        </Button>
        
        {!coords && !error && (
          <small className="text-muted mt-3 animate-pulse">
            Establishing secure location...
          </small>
        )}
      </Container>
    </Layout>
  );
}
