import { Table, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { APIUserContext } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export const ViewAllJobs = () => {
  const api = useContext(APIUserContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    const res = await api.get('/api/jobs/all-jobs');
    if (res.success) {
      setJobs(res.jobs);
    } else if (res.message) {
      setError(res.message);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <Container>
      <h1 className="mt-5" >All Jobs</h1>
      <Table className="mb-5" striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Compensation</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Address</th>
            <th>Latitude, Longitude</th>
            <th>Status</th>
            <th>Job Type</th>
            <th>Customer id</th>

          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr onClick={() =>(navigate(`/job/${job.id}`))} key={job.id}>
              <td>{job.id}</td> 
              <td>${job.price}</td>
              <td>{moment(job.start_time*1000).format('M/D/Y H:mm')}</td>
              <td>{moment(job.end_time*1000).format('M/D/Y H:mm')}</td>
              <td>{job.address}</td>
              <td>{job.coords.lat}, {job.coords.lng}</td>
              <td>{job.status}</td>
              <td>{job.job_type.job_type}</td>
              <td>{job.user_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>  
      <p className="text-danger">{error}</p>
    </Container>                              
  ) 
}