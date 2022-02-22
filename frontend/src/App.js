import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { auth } from "./services/auth";

function App() {
  return (
    <div>
      <div>
        <Navbar bg="light" expand="md">
          <Container>
            <Navbar.Brand href="/">JobFind</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {
                auth.getUser() ? 
                <Nav className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <a href="/#" onClick={auth.logout}>{auth.getUser().name}</a>
                  </Navbar.Text>
                </Nav>
                :
                <Nav className="me-auto">
                  <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Log In</Nav.Link>
                </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Container>
        <Toaster position="top-right" />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
