import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/auth";
import { Nav, Navbar, Button, Popover, OverlayTrigger, Container } from "react-bootstrap";
import { APIUserContext } from "../services/api";
import { UserCard } from "./user_card/_user_card";
import toast from "react-hot-toast";

const popover = (user, logoutF) => {
  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <UserCard user={user} />
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

    return (
      <Container>
        <Navbar>
          <Nav className="me-auto">
            {auth.user ?
              <Nav.Item>
                <Nav.Link href="/jobs">Jobs</Nav.Link>
              </Nav.Item>
              : null}
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav.Item>
          </Nav>
          {
            auth.user ?
              <Nav>
                <Nav.Item>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={popover(user, auth.logout)}>
                    <Button variant="outline-dark" onClick={() => auth.user && !user?.id ? fetchMe() : null }>{auth.user.name}</Button>
                  </OverlayTrigger>
                </Nav.Item>
              </Nav>
              : <><Nav.Item>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item><Nav.Item>
                    <Nav.Link href="/login">Log In</Nav.Link>
                  </Nav.Item></>}
        </Navbar>
      </Container>
    );
};
