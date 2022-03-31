import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";
import { MapContainer } from "../maps/_map_container";
import { GeocodeWrapper } from "../../services/geocoder";
import toast from 'react-hot-toast';

export const UserForm = ({ newUser }) => {
  const { id } = useParams(); // id is null when newUser is true
  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);

  const [auth_data, setAuthData] = useState({});
  const [role, setRole] = useState('');

  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  // Using a string to store the avatar is a terrible idea; XSS attacks galore!
  // But, we don't care about security here :)
  const [avatar, setAvatar] = useState(newUser ? 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png' : '');
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('')

  const [coords, setCoords] = useState(null);

  const [error, setError] = useState('');

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

      setAddress(res.user.home_address ? res.user.home_address : '');
      if (res.user.home_latitude && res.user.home_longitude) {
        setCoords({
          lat: res.user.home_latitude,
          lng: res.user.home_longitude
        });
      }
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  useEffect(() => {
    if (!newUser) {
      fetchUser();
    }
  }, []);

  const validateForm = async () => {
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
    if (!(await validateForm())) {
      return false;
    }

    let coordinates = coords;
    if (address) {
      coordinates = await GeocodeWrapper.fromAddress(address).then(
        (response) => {
          setError('');
          return response.results[0].geometry.location;
        },
        (error) => {
          setError('Error geocoding address');
          console.log(JSON.stringify(error));
          return false;
        }
      );
      setCoords(coordinates);
    }

    let body = {
      name,
      email,
      password,
      phone_number,
      role,
      avatar,
      address,
      coords: coordinates,
      balance: balance
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
        await auth.login(email, password).then(loginRes => {
          if (loginRes.success) {
            if (role === "worker") {
              navigate(`/worker/load-availability`);
            }
            else {
              toast.success('Sign up successful.');
              navigate('/');
            }
          } else if (loginRes.message) {
            setError(loginRes.message);
          }
        });
      } else if (res.message) {
        setError(res.message);
      }
    } else {
      const res = await api.put(`/api/user/${id}`, body);
      if (res.success) {
        if (auth.user.role !== "owner") {
          auth.updateUserAndToken(res.new_token);
        }
        toast.success('Updated successfully');
      } else if (res.message) {
        setError(res.message);
      }
    }
  }  

  return (
    <div className="mx-5 mt-5">
      <Form onSubmit={submit}>
        <h1 className="text-center">{ newUser ? "Sign Up" : "Edit Profile" }</h1>

        {
          !newUser && auth_data?.user?.role === 'worker' && auth_data?.worker ?
          <Link to={`/worker/${auth_data.worker.id}/availability`} target="_blank">Change availability/available job types</Link>
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
          <Form.Control type="number" step="0.01" value={balance} placeholder={"0.00"} onChange={(e) => setBalance(e.target.value) } />
        </Form.Group>
        <hr />
        <Form.Group className="mb-3">
          <Row>
            <Col md={6} className="text-center">
              <img src={avatar} alt="Avatar" className="avatar"></img>
            </Col>
            <Col md={6}>
              <Form.Label>Avatar*</Form.Label>
              <Form.Control type="text" value={avatar} placeholder={avatar} onChange={(e) => setAvatar(e.target.value) }/>
            </Col>
          </Row>
        </Form.Group>
        <hr />
        <Form.Group className="mb-3">
          <Row>
            <Col md={6}>
              <MapContainer spec={{
                style: {
                  'height': '300px',
                  'width': '100%'
                },
                onClick: (e) => {
                  setCoords({lat: e.latLng.lat(), lng: e.latLng.lng()});
                },
                coords: [coords],
                center: coords,
                zoom: 15,
              }} />
            </Col>
            <Col md={6}>
              <Form.Label>Address</Form.Label>
              <Form.Control id="name" type="text" placeholder="123 Apple Drive #6, Logan, Utah, 84321" value={address} onChange={(e) => setAddress(e.target.value)} />
              {
                coords?.lat && coords?.lng ? 
                  <p className="text-muted">Leave blank to only store your home location at coordinates {`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`} and ignore address.<br />Or, enter your address and submit to update your location.</p>
                  : null}
            </Col>
          </Row>
        </Form.Group>
        <hr />
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