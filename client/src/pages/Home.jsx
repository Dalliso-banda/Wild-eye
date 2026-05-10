import Layout from '../layouts/MobileLayout';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Layout>
        {/* Flexbox container to center everything vertically and horizontally */}
    <Container className="mt-4">
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
      {/* More items here */}
    </ul>
  </div>
</Container>
  <Container
          className="d-flex flex-column justify-content-center align-items-center" 
          style={{ minHeight: '80vh' }}
        >
          
          {/* Wild-Eye Heading */}
          <h1 
            className="text-center fw-bold mb-5 text-uppercase" 
            style={{ letterSpacing: '3px', color: '#4a4a4a' }}
          >
            Wild-Eye
          </h1>

          {/* Round Distress Button */}
          <Button
            as={Link}
            to="/map"
            variant="danger"
            className="rounded-circle shadow-lg d-flex flex-column justify-content-center align-items-center text-decoration-none"
            style={{ 
              width: '180px', 
              height: '180px', 
              border: '4px solid #f8d7da' // Adds a subtle border ring
            }}
          >
            <span className="fs-5">Distress</span>
            <span className="fs-1 fw-bold">SOS</span>
          </Button>

        </Container>
      </Layout>
    </>
  );
}