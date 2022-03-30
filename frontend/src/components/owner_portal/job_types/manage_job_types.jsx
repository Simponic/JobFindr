import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { APIUserContext } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


export const ManageJobTypes = () => {
  const api = useContext(APIUserContext);
  const [jobTypes, setJobTypes] = useState([]);
  let CurrIcon = null;
  const navigate = useNavigate();

  // Only take from gi library
  const icons = require('react-icons/gi');

  const fetchJobTypes = async () => {
    const res = await api.get('/api/jobs/all-job-types');
    if (res.success) {
      setJobTypes(res.job_types.sort(compare));
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  const toggleJobTypeStatus = async (id) => {
    const res = await api.get(`/api/jobs/${id}/toggle-job-type`);
    if (!res.success) {
      toast.error(res.message);
    }
    fetchJobTypes();
  }

  // Sorts forms so that active job types are first, then by most recent job type id
  const compare = (a, b) => {
    if (a.archived === b.archived) {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
    }
    else {
      if (a.archived === false) {
        return -1;
      }
      else {
        return 1;
      }
    }
  }

  const getIcon = (iconName) => {
    CurrIcon = icons[iconName]; 
  }

  useEffect(() => {
    fetchJobTypes();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-5">Job Types</h1>
        </Col>
        <Col sm={1} className="mt-5 add-job-type-btn-col">
          <Button variant="secondary" className="add-job-type-btn" onClick={() => navigate('add')}>Add Type</Button>
        </Col>
      </Row>
      <Table className="mb-5" striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Icon Name</th>
            <th>Icon</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobTypes.map((jobType) => (
            <tr key={jobType.id}>
              <td>{jobType.id}</td>
              <td>{jobType.job_type}</td>
              <td>{jobType.icon}</td>
              <td>
                {getIcon(jobType.icon)}
                <CurrIcon className="list-icons"/>
              </td>
              <td>
                <Button className="status-btn" variant={jobType.archived ? "danger" : "outline-danger"} onClick={() => toggleJobTypeStatus(jobType.id)}>
                  {jobType.archived ? 'Archived' : 'Active'}
                </Button>
              </td>
            </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );

}