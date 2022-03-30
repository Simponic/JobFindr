import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight} from 'react-icons/fa';
import { AuthContext } from "../../services/auth";
import { useContext } from "react";
import { NotFound } from "../../components/errors/not_found";
import { Row, Col } from "react-bootstrap";


export const OwnerPortal = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return ( 
    <Container>
    {auth.user.role === 'owner' ?
    <><h1 className="mt-5">Site Tools</h1><p>Welcome! This portal gives you access to manage site users, jobs, and contact forms.</p><p>Select one of the options below.</p>
    <Row>
        <Col md={2} sm={3}>
          <Card className="card-shadow">
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/portal_images/conference-128.png'} alt="users icon"/>
            <Card.Body>
              <Card.Title>Site Users</Card.Title>
              <Card.Text className="text-height">
                A list of all users on the site. Click on a user to view and edit their profile. 
              </Card.Text>
              <Button className="portal-btn" variant="secondary" onClick={() => {navigate('/owner/view-users')}}><FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={3}>
          <Card className="card-shadow">
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/portal_images/clipboard-8-128.png'} alt="contact form icon" />
            <Card.Body>
              <Card.Title>Contact Forms</Card.Title>
              <Card.Text className="text-height">
                A list of all contact forms submitted to the site. {'\u00A0'.repeat(30)}
              </Card.Text>
              <Button className="portal-btn" variant="secondary" onClick={() => {navigate('/owner/view-forms')}}><FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={3}>
          <Card className="card-shadow">
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/portal_images/view-details-128.png'} alt="job listings icon" />
            <Card.Body>
              <Card.Title>Job Listings</Card.Title>
              <Card.Text className="text-height">
                A list of all jobs posted to the site. Click on a job to view and edit it. {'\u00A0'.repeat(6)}
              </Card.Text>
              <Button className="portal-btn" variant="secondary" onClick={() => {navigate('/owner/view-jobs')}}><FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2} sm={3}>
          <Card className="card-shadow">
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/portal_images/rake-128.png'} alt="job type icon" />
            <Card.Body>
              <Card.Title>Job Types</Card.Title>
              <Card.Text className="text-height">
                A management tool to create, edit, or archive job types. {'\u00A0'.repeat(24)}
              </Card.Text>
            <Button className="portal-btn" variant="secondary"><FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>


      </Row></>
    : <NotFound />
    } 
    

  </Container>
  )
}