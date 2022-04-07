import { Button, Container, Col, Row, Image } from "react-bootstrap";

export const UserCard = ({ user, showContact }) => {
  if (user.id) {

    return (
      <a href={`/profile/${user.id}/edit`}>
        <Button variant="secondary">
          <Container>
            <Row>
              <Col xs={3}><Image src={user.avatar} className="avatar-sm" alt="avatar" /></Col>
              <Col xs={9}>
                <h5>{user.name}</h5>
                <span>{user.role}</span>
                <br />
                {showContact ? 
                  <>
                    <span>{user.email}</span>
                    <br />
                    <span>{user.phone_number}</span>
                    <br />
                  </>
                  : null
                }
              </Col>
            </Row>
          </Container>
        </Button>
      </a>
    );
  }
  return null;
}