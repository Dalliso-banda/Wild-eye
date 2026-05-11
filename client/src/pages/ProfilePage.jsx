import Layout from '../layouts/MobileLayout';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/UserAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`/api/report/user-reports/${user.id}`);
    
        setReports(response.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchReports();
  }, [user?.id]); 
 
  if (!user) return null;

  return (
    <Layout>
      <Container className="mt-4 pb-5">
   
        <div className="text-center mb-4">
          <div 
            className="rounded-circle bg-danger d-flex align-items-center justify-content-center mx-auto mb-3 shadow"
            style={{ width: '80px', height: '80px', fontSize: '2rem', color: 'white' }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h4 className="fw-bold mb-0">{user.name}</h4>
          <small className="text-muted">{user.email}</small>
        </div>

        {/* 2. Impact Dashboard Stats */}
        <Row className="g-3 mb-4">
          <Col xs={6}>
      <Link to={'/my-reports'} className="text-decoration-none text-reset">
            <Card className="border-0 shadow-sm text-center p-3 rounded-4">
              <h3 className="fw-bold text-danger mb-0">{reports.length || 0}</h3>
              <small className="text-muted">Reports</small>
            </Card>
      </Link>
          </Col>
          <Col xs={6}>
            <Card className="border-0 shadow-sm text-center p-3 rounded-4">
              <h3 className="fw-bold text-success mb-0">Active</h3>
              <small className="text-muted">Status</small>
            </Card>
          </Col>
        </Row>

        <h6 className="fw-bold mb-3">Safety Controls</h6>
        <ListGroup className="shadow-sm rounded-4 overflow-hidden border-0 mb-4">
    
          <ListGroup.Item action className="py-3 d-flex justify-content-between align-items-center">
            <span>Zones status</span>
            <i className="bi bi-chevron-right text-muted">
                <span className='text-danger'>
         zone not safe
                </span>
            </i>
          </ListGroup.Item>
        
        </ListGroup>

        <h6 className="fw-bold mb-3">Recent Activity</h6>
        <div className="bg-white p-3 rounded-4 shadow-sm border mb-4">
          {user.recentReports?.length > 0 ? (
            <ul className="list-unstyled mb-0">
      
            </ul>
          ) : (
            <p className="text-muted small mb-0 text-center py-2">No recent alerts reported.</p>
          )}
        </div>

     
        <Button 
          variant="outline-danger" 
          className="w-100 rounded-pill py-3 fw-bold border-2"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout of Wild-Eye
        </Button>
      </Container>
    </Layout>
  );
}
