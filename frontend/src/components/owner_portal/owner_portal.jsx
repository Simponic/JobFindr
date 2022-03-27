import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight} from 'react-icons/fa';
import { AuthContext } from "../../services/auth";
import { useContext } from "react";


export const OwnerPortal = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);




  return ( 
    <Container>
      {auth.user.role === 'owner' ?
      <><h1 className="mt-5">Site Tools</h1><p>Welcome! This portal gives you access to manage site users, jobs, and contact forms.</p><p>Select one of the options below.</p>
      <div className="portal-cards">
          <Card className="card">
            <Card.Img variant="top" height="250vh" src={process.env.PUBLIC_URL + '/portal_images/conference-128.png'} alt="users icon"/>
            <Card.Body className="card-desc">
              <Card.Title>Site Users</Card.Title>
              <Card.Text>
                A list of all users on the site. Click on a user to view and edit their profile.
              </Card.Text>
              <Button className="card-button" variant="secondary" onClick={() => {navigate('/owner/view-users')}}><FaArrowRight /></Button>
            </Card.Body>
          </Card>

          <Card className="card">
            <Card.Img variant="top" height="250vh" src={process.env.PUBLIC_URL + '/portal_images/clipboard-8-128.png'} alt="contact form icon" />
            <Card.Body className="card-desc">
              <Card.Title>Contact Forms</Card.Title>
              <Card.Text>
                A list of all contact forms submitted to the site. 
              </Card.Text>
              <Button className="card-button" variant="secondary" onClick={() => {navigate('/owner/view-forms')}}><FaArrowRight /></Button>
            </Card.Body>
          </Card>

          <Card className="card">
            <Card.Img variant="top" height="250vh" src={process.env.PUBLIC_URL + '/portal_images/view-details-128.png'} alt="job listings icon" />
            <Card.Body className="card-desc">
              <Card.Title>Job Listings</Card.Title>
              <Card.Text>
                A list of all jobs posted to the site. Click on a job to view and edit it.
              </Card.Text>
              <Button className="card-button" variant="secondary"><FaArrowRight /></Button>
            </Card.Body>
          </Card>

          <Card className="card">
            <Card.Img variant="top" height="250vh" src={process.env.PUBLIC_URL + '/portal_images/rake-128.png'} alt="job type icon" />
            <Card.Body className="card-desc">
              <Card.Title>Job Types</Card.Title>
              <Card.Text>
                A tool to create, edit, or archive job types.
              </Card.Text>
              <Button className="card-button" variant="secondary"><FaArrowRight /></Button>
            </Card.Body>
          </Card>


        </div></>
      : <PageNotFound />
      } 
      

    </Container>
  )
}