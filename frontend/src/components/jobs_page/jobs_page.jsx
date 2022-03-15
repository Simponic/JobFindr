import { ListGroup, Container, Button, Col } from 'react-bootstrap';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { GiGrass } from 'react-icons/gi';

export const JobsPage = () => {
  let jobs = ['replace', 'with', 'actual', 'jobs', 'a', 'b', 'c', 'd'];
  return (
    <Container className="flex">
      <div className="mt-5"></div>
      <h1 className="text-2xl mt-5 mb-3 logo-color">Jobs</h1>
      <div className="job-scroll scrollbar-primary">

        <ListGroup as="ul">
          {jobs.map((job) => (
            <ListGroup.Item
              key={job} // Change to job.id
              as="li"
              className="d-flex justify-content-between align-items-start m-2">
              <div className="pt-4">
                <GiGrass className='list-icons'/>
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