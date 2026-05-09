import Layout from '../layouts/MobileLayout';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Layout>
        {/* Flexbox container to center everything vertically and horizontally */}
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
            <span className="fs-5">Distres</span>
            <span className="fs-1 fw-bold">911</span>
          </Button>

        </Container>
      </Layout>
    </>
  );
}