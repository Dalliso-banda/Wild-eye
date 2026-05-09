import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer(){

    return(
   <>

<footer className="py-3 mt-auto text-center" style={{ backgroundColor: '#f8f9fa' }}>
          <Container>
            <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
              &copy; {new Date().getFullYear()} Wild-Eye. Always watching out for you.
            </p>
            <div className="mt-1">
              <Link to="/about" className="text-secondary text-decoration-none mx-2" style={{ fontSize: '0.8rem' }}>About</Link>
              <Link to="/privacy" className="text-secondary text-decoration-none mx-2" style={{ fontSize: '0.8rem' }}>Privacy Policy</Link>
            </div>
          </Container>
        </footer>
   </>
    )
}