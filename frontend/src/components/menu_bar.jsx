import { useContext } from "react";
import { AuthContext } from "../services/auth";
import { Nav, Navbar } from "react-bootstrap";
import { APIUserContext } from "../services/api";

export const MenuBar = () => {
  const auth = useContext(AuthContext);
  const api = useContext(APIUserContext);

  const echoMe = async () => console.log(await api.get("/api/user/me")); 


  if (auth.user) {
    return (
      <Nav className="justify-content-end">
        <button onClick={echoMe}>Bruh</button>
        <Navbar.Text>
          <a href="/#" onClick={auth.logout}>
            {auth.user.name}
          </a>
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
