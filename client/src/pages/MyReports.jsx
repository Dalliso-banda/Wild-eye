import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layouts/MobileLayout';
import { 
  Container, Card, Form, Button, Badge, Stack, Modal, Spinner 
} from 'react-bootstrap';
import { useAuth } from '../context/UserAuth';

export default function MyReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [showEdit, setShowEdit] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [editData, setEditData] = useState({ type: '', description: '' });

  // 1. Fetch Reports (Fixed useEffect)
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
  
const toggleStatus = async (report) => {
    const newStatus = report.status === 'active' ? 'draft' : 'active';
    
  
    setReports(reports.map(r => r.id === report.id ? { ...r, status: newStatus } : r));

    try {
     
      await axios.put(`/api/report/update/${report.id}`, { 
        ...report,
        status: newStatus 
      });
      
      console.log(`Report ${report.id} updated to ${newStatus}`);
    } catch (error) {
    
      console.error('Status update failed:', error.response?.data || error.message);
      setReports(reports.map(r => r.id === report.id ? { ...r, status: report.status } : r));
      alert("Could not update status. Check console for details.");
    }
  };

  // 3. Handle Edit Modal Open
  const handleEditClick = (report) => {
    setCurrentReport(report);
    setEditData({ type: report.type, description: report.description });
    setShowEdit(true);
  };

  // 4. Save Edited Changes
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`/api/report/update/${currentReport.id}`, editData);
      setReports(reports.map(r => r.id === currentReport.id ? response.data : r));
      setShowEdit(false);
    } catch (error) {
      alert("Failed to update report");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="danger" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="mt-4 pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">My Reports</h4>
          <Badge bg="dark" className="rounded-pill px-3">{reports.length}</Badge>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-5 text-muted">No reports found.</div>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="border-0 shadow-sm rounded-4 mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-bold mb-1">{report.type?report.type:'kindly add'}</h6>
                    <small className="text-muted d-block mb-2">
                      {new Date(report.created_at).toLocaleDateString()}
                    </small>
                  </div>
                  <Form.Check 
                    type="switch"
                    id={`status-${report.id}`}
                    label={<small className="fw-bold ms-1">{report.status.toUpperCase()}</small>}
                    checked={report.status === 'active'}
                    onChange={() => toggleStatus(report)}
                    className={report.status === 'active' ? 'text-success' : 'text-muted'}
                  />
                </div>
                
                <p className="text-secondary small mb-3">{report.description}</p>

                <Stack direction="horizontal" gap={2}>
                  <Button 
                    variant="light" 
                    size="sm" 
                    className="rounded-pill px-3 fw-bold flex-grow-1"
                    onClick={() => handleEditClick(report)}
                  >
                    Edit Details
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          ))
        )}

        {/* Edit Modal */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">Modify Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Type</Form.Label>
              <Form.Control 
                type="text" 
                value={editData.type}
                onChange={(e) => setEditData({...editData, type: e.target.value})}
                className="rounded-3"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                className="rounded-3"
              />
            </Form.Group>
            <Button 
              variant="danger" 
              className="w-100 rounded-pill py-2 fw-bold shadow-sm"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    </Layout>
  );
}