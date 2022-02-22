import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from 'react-hot-toast';

export const SignUp = () => {
  const [firstName, setFirstName] = useState('');  
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!firstName) {
      setError('First name is required');
      return false;
    }
    if (!lastName) {
      setError('Last name is required');
      return false;
    }
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (phone_number.length < 10 || phone_number.length > 16) {
      setError('Phone number must be between 10 and 16 characters');
      return false;
    }
    setError('');
    return true;
  };

  const signup = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return false;
    }

    let body = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      phone_number: phone_number,
      role: role
    };

    const res = await fetch("/api/user/sign-up", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((x) => x.json());
    if (res.success) {
      toast.success('Sign up successful. Please login.');
      navigate('/login');
    } else if (res.message) {
      setError(res.message);
    }
  }  

  return (
    <div className="mx-5">
      <Form onSubmit={signup}>
        <h1 className="text-center">Sign Up</h1>
        <div className="row">
          <div className="col">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={(e) => setFirstName(e.target.value)} required />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={(e) => setLastName(e.target.value)} required />
              </Form.Group>
            </div>
          </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="(435)123-4567" onChange={(e) => setPhoneNumber(e.target.value)} required />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <p>I am a:</p>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="radio" name="role" label="Customer" defaultChecked={true} onChange={() => setRole('customer')} />
          <Form.Check type="radio" name="role" label="Worker" onChange={() => setRole('worker')} />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}