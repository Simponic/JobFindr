import { ListGroup, Container, Button } from 'react-bootstrap';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useState, useContext, useEffect } from 'react';
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";
import toast from 'react-hot-toast';

export const JobsPage = () => {
  let CurrIcon = null;

  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  // Only take from gi library
  const icons = require('react-icons/gi');

  const fetchJobs = async () => {
    const res = await api.get(`/api/jobs/user/${auth.user.id}`);
    if (res.success) {
      setJobs(res.jobs);
    } else if (res.message) {
      toast.error(res.message);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  const getIcon = (iconName) => {
    CurrIcon = icons[iconName]; 
  }

  return (
    <Container className="flex">
      <div className="mt-5"></div>
      <h1 className="text-2xl mt-5 mb-3 logo-color">Jobs</h1>
      <div className="job-scroll scrollbar-primary">

        <ListGroup as="ul">
          {jobs.map((job) => (
            <ListGroup.Item
              key={job.id} // Change to job.id
              as="li"
              className="d-flex justify-content-between align-items-start m-2">
              <div className="pt-4">
              {getIcon(job.job_type.icon)}
              <CurrIcon className="list-icons"/>
              </div>
              <div>
                <div className="job-title">{job.title}</div>
                <Container className="flex-col">
                  <div className="job-listing">
                    <Button variant="secondary">
                      <FaLongArrowAltRight />
                    </Button>
                  </div>
                  <span className="job-listing">Status: Assigned</span>
                </Container>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  )
}