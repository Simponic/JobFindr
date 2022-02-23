import { Navbar, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./services/auth";
import { MenuBar } from "./components/menu_bar";
import { APIUserContextProvider } from "./services/api";

function App() {
  return (
    <AuthContextProvider>
      <APIUserContextProvider>
        <div>
          <div>
            <Navbar bg="light" expand="md">
              <Container>
                <Navbar.Brand href="/">JobFind</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <MenuBar />
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
          <Container>
            <Toaster position="top-right" />
            <Outlet />
          </Container>
        </div>
      </APIUserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
