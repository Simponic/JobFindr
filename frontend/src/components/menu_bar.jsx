import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/auth";
import { Nav, Navbar, Button, Popover, OverlayTrigger, Image, Container, Row, Col } from "react-bootstrap";
import { APIUserContext } from "../services/api";
import toast from "react-hot-toast";

const popover = (user, logoutF) => {
  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <a href={`/profile/${user.id}/edit`}>
          <Button variant="secondary">
            <Container>
              <Row>
                <Col xs={3}><Image src={user.avatar} className="avatar-sm" alt="avatar" /></Col>
                <Col xs={9}>
                  <h5>{user.name}</h5>
                  <span>{user.role}</span>
                </Col>
              </Row>
            </Container>
          </Button>
        </a>
        <Button variant="danger" onClick={logoutF}>
          Logout
        </Button>
      </Popover.Body>
    </Popover>
  )
};

export const MenuBar = () => {
  const auth = useContext(AuthContext);
  const api = useContext(APIUserContext);
  const [user, setUser] = useState({});

  const fetchMe = async () => {
    const res = await api.get(`/api/user/${auth.user.id}`);
    if (res.success) {
      setUser(res.user);
    } else if (res.message) {
      toast.error(res.message);
    }
  }
  useEffect(() => {
    if (auth.user) {
      fetchMe();
    }
  }, []);

  if (auth.user) {
    return (
      <Nav className="justify-content-end">
        <Navbar.Text>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover(user, auth.logout)}>
            <Button variant="secondary" onClick={() => auth.user && !user?.id ? fetchMe() : null }>{auth.user.name}</Button>
          </OverlayTrigger>
        </Navbar.Text>
      </Nav>
    );
  } else {
    return (
      <Nav className="me-auto">
        <Nav.Link href="/sign-up">Sign Up</Nav.Link>
        <Nav.Link href="/login">Log In</Nav.Link>
      </Nav>
    );
  }
};
