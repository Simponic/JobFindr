import { ListGroup, Container, Button } from 'react-bootstrap';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export const JobsPage = () => {
  let CurrIcon = null;

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Api call to get jobs (depends on worker or customer)
    // Set jobs
  });

  // Only take from gi library
  const icons = require('react-icons/gi');

  let testJobs = ['replace', 'with', 'actual', 'jobs', 'a', 'b', 'c', 'd'];


  // Won't need this once we can access job.jobtype.icon
  const job_type_icons = ['GiGrass', 'GiSpade', 'GiRake', 'GiHammerNails', 'GiSnowing', 'GiBriefcase', 'GiBeerStein', 'GiCigar']

  // Also won't need this
  const getIcon = (num) => {
    let iconName = job_type_icons[num];
    CurrIcon = icons[iconName]; 
  }

  // Replace the function above with this one, then just call getIcon() below
  // const getIcon = () => {
  //   CurrIcon = icons[job.jobtype.icon] 
  // }
  


  return (
    <Container className="flex">
      <div className="mt-5"></div>
      <h1 className="text-2xl mt-5 mb-3 logo-color">Jobs</h1>
      <div className="job-scroll scrollbar-primary">

        <ListGroup as="ul">
          {testJobs.map((job) => (
            <ListGroup.Item
              key={job} // Change to job.id
              as="li"
              className="d-flex justify-content-between align-items-start m-2">
              <div className="pt-4">
              {getIcon(testJobs.indexOf(job)) /* Change to just getIcon() */}
              <CurrIcon className="list-icons"/>
              </div>
              <div>
                <div className="job-title">100 acre lawn $30 compensation asdf asdf asdfasd fasdf asdfasdf asdfasdf asdfasdfasdf</div>
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