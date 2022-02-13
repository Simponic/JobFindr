import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    const res = await fetch("/api/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then((x) => x.json());

    if (res.success) {
      toast.success('Logged in successfully');
      // Local storage is prone to XSS attacks, but we don't care about security here :)
      localStorage.setItem('token', res.jwt_token);
      navigate('/');

      // TODO: The user isn't actually logged in, all we've done is store the JWT token.
    } else if (res.message) {
      setError(res.message);
    }
  }
  return (
    <div className="mx-5">
      <Form onSubmit={login}>
        <h1 className="text-center">Log In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};