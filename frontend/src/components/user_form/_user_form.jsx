import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";
import toast from 'react-hot-toast';

export const UserForm = ({ newUser }) => {
  const { id } = useParams(); // id is null when newUser is true
  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  // Using a string to store the avatar is a terrible idea; XSS attacks galore!
  // But, we don't care about security here :)
  const [avatar, setAvatar] = useState(newUser ? 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png' : '');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [auth_data, setAuthData] = useState({});
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await api.get(`/api/user/${id}`);
    if (res.success) {
      setAuthData(res); // has user prop and worker prop (if exists)
      setName(res.user.name);
      setEmail(res.user.email);
      setAvatar(res.user.avatar);
      setBalance(res.user.balance);
      setPhoneNumber(res.user.phone_number);
    } else if (res.message) {
      setError(res.message);
    }
  }

  useEffect(() => {
    if (!newUser) {
      fetchUser();
    }
  }, []);

  const validateForm = () => {
    if (!name) {
      setError('Name is required');
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

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return false;
    }

    let body = {
      name,
      email,
      password,
      phone_number,
      role,
      avatar,
      balance: Math.min(balance, 0)
    };

    if (newUser) {
      const res = await fetch("/api/user/sign-up", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }).then((x) => x.json());
      if (res.success) {
        toast.success('Sign up successful. Please login.');
        navigate('/login');
      } else if (res.message) {
        setError(res.message);
      }
    } else {
      const res = await api.put(`/api/user/${id}`, body);
      if (res.success) {
        auth.updateUserAndToken(res.new_token);
        toast.success('Updated successfully');
      } else if (res.message) {
        setError(res.message);
      }
    }
  }  

  return (
    <div className="mx-5">
      <Form onSubmit={submit}>
        <h1 className="text-center">{ newUser ? "Sign Up" : "Edit Profile" }</h1>

        {
          !newUser && auth_data?.user?.role === 'worker' && auth_data?.worker ?
          <Link to={`/worker/${auth_data.worker.id}/availability`} target="_blank">Change availability</Link>
          :
          null
        }

        <Form.Group className="mb-3">
          <Form.Label>Name*</Form.Label>
          <Form.Control id="name" type="text" placeholder="Johnny Appleseed" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address*</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number*</Form.Label>
          <Form.Control type="text" placeholder="(435)123-4567" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </Form.Group>
      
        {
          newUser ? 
            <Form.Group className="mb-3">
              <Form.Label>Password*</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            :
            <>
              <Form.Group className="mb-3">
                <Form.Label>Change Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
            </>
        }

        <Form.Group className="mb-3">
          <Form.Label>Balance</Form.Label>
          <Form.Control type="number" step="0.01" min="0" value={balance} placeholder={"0.00"} onChange={(e) => setBalance(e.target.value) } />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Avatar*</Form.Label>
          <Form.Control type="text" value={avatar} placeholder={avatar} onChange={(e) => setAvatar(e.target.value) }/>
          <br />
          <img src={avatar} alt="Avatar" className="avatar"></img>
        </Form.Group>

        {
          newUser ? 
          <>
            <p>I am a:</p>
            <Form.Group className="mb-3">
              <Form.Check type="radio" name="role" label="Customer" defaultChecked={true} onChange={() => setRole('customer')} />
              <Form.Check type="radio" name="role" label="Worker" onChange={() => setRole('worker')} />
            </Form.Group>
          </>
          :
          null
        }

        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}