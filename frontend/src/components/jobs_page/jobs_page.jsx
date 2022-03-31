import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";
import { WorkerSchedule } from './schedule';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const JobsPage = () => {
  let CurrIcon = null;

  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);
  const [initialJobs, setInitialJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobTimes, setJobTimes] = useState([]);
  const [jobFilterStatus, setJobFilterStatus] = useState("")
  const [highlighted, setHighlighted] = useState("");
  const navigate = useNavigate();

  // Only take from gi library
  const icons = require('react-icons/gi');

  const fetchJobs = async () => {
    const res = await api.get(`/api/jobs/user/${auth.user.id}`);
    if (res.success) {
      setInitialJobs(res.jobs);
      if (res.job_times) {
        setJobTimes(res.job_times);
      }
    } else if (res.message) {
      toast.error(res.message);
    }
  };

  const completeJob = async (id) => {
    const res = await api.get(`/api/jobs/${id}/complete`);
    if (res.success) {
      fetchJobs();
      toast.success(`Success. $${res.withdrawn.toFixed(2)} withdrawn from customer account.`)
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  const assignJob = async (id) => {
    const res = await api.get(`/api/jobs/${id}/assign`);
    if (res.success) {
      fetchJobs();
      toast.success(`Success. Worker assigned`)
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setJobs(initialJobs.filter((job) => jobFilterStatus ? job.status === jobFilterStatus : true))
  }, [initialJobs, jobFilterStatus]);

  const getIcon = (iconName) => {
    CurrIcon = icons[iconName]; 
  }

  return (
    <Container className="flex">

      <div className="mt-5"></div>
      <h1 className="text-2xl mt-5 mb-3 logo-color">Jobs</h1>
      <Row>
        <Col lg={6}>
          {
            [
              { value: '', label: 'All' },
              (auth.user.role === 'worker' ? null : { value: 'available', label: 'Unassigned' }),
              { value: 'assigned', label: 'Assigned' },
              { value: 'complete', label: 'Completed' },
              { value: 'disputed', label: 'Disputed' },
            ].map((filter, index) => (
              (filter ? 
                <Button key={index} variant={jobFilterStatus === filter.value ? "primary" : "outline-primary"} className="mr-2" onClick={() => {
                  setJobFilterStatus(filter.value);
                }}>{filter.label}</Button>
                : null)
              ))
          }
          <div className="job-scroll scrollbar-primary">
              {jobs.map((job) => (
                <Row
                  className={`border rounded ${job.id == highlighted ? "highlighted" : ""}`}
                  id={`job-${job.id}`}
                  key={job.id}
                  onClick={() => { setHighlighted(''); }}
                  as="li">
                  <Link to={`/job/${job.id}`}><div className="job-title">{job.title}</div></Link>
                  <Col sm={2} className="d-flex align-items-center">
                    {getIcon(job.job_type.icon)}
                    <CurrIcon className="list-icons"/>
                  </Col>
                  <Col sm={6} className="d-flex align-items-center">
                    <p>
                      Estimated: {job.time_estimate.toFixed(2)} hours
                      <br />
                      Price: ${job.price.toFixed(2)}
                      {
                        auth.user && auth.user.role === 'worker' ?
                          <>
                            <br />
                            Compensation: ${job.compensation.toFixed(2)}
                          </>
                          : null
                      }
                      <br />
                      Notes: {job.comment}
                    </p>
                  </Col>
                  <Col sm={4}>
                      <span className="job-listing">Status: {job.status}</span>
                      <br />
                      {
                        (auth.user.role === "worker" && job.status === "assigned") || (auth.user.role === "customer" && (job.status === "complete" || job.status === "assigned"))
                          ? <Link to={`/contact/dispute/${job.id}`}><Button variant="danger">Dispute</Button></Link>
                          : null
                      }
                      <br />
                      {
                        (auth.user.role !== "worker" && job.status === "assigned")
                          ? <div className="mb-2">
                              <Button variant="success" onClick={() => completeJob(job.id)}>Complete</Button>
                            </div>
                          : null
                      }
                      {
                        (auth.user.role === "customer" && job.status === "available")
                          ? <div className="mb-2">
                              <Button variant="success" onClick={() => assignJob(job.id)}>Assign</Button>
                            </div>
                          : null
                      }
                      {
                        (auth.user.id == job.user_id || auth.user.role === "owner")
                          ? <Link to={`/job/${job.id}/edit`}><Button variant="primary">Edit</Button></Link>
                          : null
                      }
                    </Col>
                    <div>Job Id: {job.id}</div>
                </Row>
              ))}
          </div>
          { auth.user.role === "customer" && <Button className="w-100" variant="secondary" onClick={() => {navigate('/jobs/add-job')}}>Create New Listing</Button>}
          
        </Col>
      <Col lg={6}>
      {
        (auth.user.role === "worker" && jobFilterStatus === "assigned") ?
          <WorkerSchedule 
            workerEvents={jobTimes.filter((j) => j.status == "assigned").map((j) => {
              return {
                id: j.job_id,
                title: initialJobs.find((job) => job.id == j.job_id).title,
                start: moment(j.start_time*1000).format(),
                end: moment(j.end_time*1000).format(),
              };
            })}
            onEventClick={(e) => {
              const jobCard = document.getElementById(`job-${e.event.id}`);
              setJobFilterStatus("assigned");
              if (jobCard) {
                jobCard.scrollIntoView()
                setHighlighted(e.event.id);
              }
            }}
          />
        : null
      }
      </Col>
      </Row>
    </Container>
  )
}