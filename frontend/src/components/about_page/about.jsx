import { useContext } from "react";
import { AuthContext } from "../../services/auth";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const About = () => {
  const auth = useContext(AuthContext);
  return (
  <div>
    <Container className={"container-sm"}>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className='mt-5 mb-5'> About JobFind </h1>
          <img style={{width: "100%"}} src={process.env.PUBLIC_URL + '/img/lawn_mowing.jpg'} alt="Kid lawn mowing"/>
          <p> JobFind is the app for customers who need general service and for workers seeking general service work. </p>
          <p> Our app is simple to use. Customers can create a job by selecting the service they need (lawn mowing, shoveling, etc.), setting the date and time, and adding any specific instructions. Then, our app will automatically match them with a worker who is available to do the job. </p>
          <p> Workers love JobFind because it is a great way to find work in their local area. They can see what jobs are available, and they can choose the jobs that they are interested in. </p>
          <p className='fst-italic'> We are not committed to providing a safe and easy way for customers and workers to connect. We do not screen all workers, and we do not provide insurance and payment protection for customers. </p>
          {
            auth.user ? 
            null
            : <Link to='/signup'>Sign up now!</Link>
          }
        </Col>
      </Row>
    </Container>
   </div>
  );
}
