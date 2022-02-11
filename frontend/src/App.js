import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Navbar bg="light" expand="md">
          <Container>
            <Navbar.Brand href="/">JobFind</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
