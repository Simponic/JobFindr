import { ListGroup, Container, Button } from 'react-bootstrap';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { GiGrass } from 'react-icons/gi';

export const JobsPage = () => {
  return (
    <Container>
      <div className="mt-5"></div>
      <h1 className="text-2xl mt-5 mb-3 logo-color">Jobs</h1>
      <div className="job-scroll scrollbar-primary">
        <ListGroup as="ul">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <p className="jobtype">Lawn Mowing <GiGrass/></p>
            <div>
              <div className="job-title">100 acre lawn $30 compensation asdf asdf asdfasd fasdf asdfasdf asdfasdf asdfasdfasdf</div>
              <Container className="flex-col">
                <div className="job-listing">
                  <Button variant="secondary">
                    <FaLongArrowAltRight />
                  </Button>
                </div>
                <p className="job-listing">Status: Assigned</p>
              </Container>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  )
}