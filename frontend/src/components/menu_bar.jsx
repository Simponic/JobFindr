import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/auth";
import { Nav, Navbar, Button, Popover, OverlayTrigger, Image, Container, Row, Col } from "react-bootstrap";
import { APIUserContext } from "../services/api";
import toast from "react-hot-toast";

const popover = (user, logoutF) => {
  return (
    <Popover id="popover-basic">
      <Popover.Body>
        {user.id ?
          <a href={`/profile/${user.id}/edit`}>
            <Button variant="secondary">
              <Container>
                <Row>
                  <Col xs={3}><Image src={user.avatar} className="avatar-sm" alt="avatar" /></Col>
                  <Col xs={9}>
                    <h5>{user.name}</h5>
                    <span>{user.role}</span>
                    <br />
                    <span>${parseFloat(user.balance, 10).toFixed(2)}</span>
                  </Col>
                </Row>
              </Container>
            </Button>
          </a>
          : null }
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
      <Container>
        <Navbar>
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link href="/jobs">Jobs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover(user, auth.logout)}>
                <Button variant="outline-dark" onClick={() => auth.user && !user?.id ? fetchMe() : null }>{auth.user.name}</Button>
              </OverlayTrigger>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Container>
    );
  } else {
    return (
      <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav.Item>
      </Nav>
    );
  }
};
