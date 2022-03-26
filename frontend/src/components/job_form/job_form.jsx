import { BasicDateTimePicker } from "./time_picker"
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { MapContainer } from "../maps/_map_container";
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";
import { GeocodeWrapper } from "../../services/geocoder";
import toast from 'react-hot-toast';

export const JobForm = ({ newJob }) => {
  const { id } = useParams(); // id is null when newJob is true
  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);

  const [comment, setComment] = useState('');
  const [jobTypes, setJobTypes] = useState([]);
  const [jobType, setJobType] = useState('');
  const [price, setPrice] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [coords, setCoords] = useState(null);

  const [error, setError] = useState('');

  const fetchJob = async () => {
    // const res = await api.get(`/api/job/${id}`);  
    // set job fields
  }

  const fetchJobTypes = async () => {
    const res = await api.get('/api/jobs/job-types');
    if (res.success) {
      setJobTypes(res.job_types);
      setJobType(res.job_types[0].id);
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  const setAddressFromUser = async () => {
    const res = await api.get(`/api/user/${auth.user.id}`);
    setAddress(res.user.home_address ? res.user.home_address : '');
    if (res.user.home_latitude && res.user.home_longitude) {
      setCoords({
        lat: res.user.home_latitude,
        lng: res.user.home_longitude
      });
    }
  }

  useEffect(() => {
    fetchJobTypes();
    if (!newJob) {
      fetchJob();
    } else {
      setAddressFromUser();
    }
  }, []);

  const handleTimeChange = (e, timeFrame) => {
    if (timeFrame === "start") {
      setStartTime(e);
    }

    if (timeFrame === "end") {
      setEndTime(e);
    }
  } 

  const validateForm = () => {
    let currUnix = Math.floor(new Date().getTime() / 1000);
    let startUnix = Math.floor(startTime.getTime() / 1000);
    let endUnix = Math.floor(endTime.getTime() / 1000);

    if (!comment) {
      setError('Job details are required');
      return false;
    }

    if (!jobType) {
      setError('Job type is required');
      return false;
    }

    if (!price) {
      setError('Compensation is required');
      return false;
    }

    if (!timeEstimate) {
      setError('Time estimate is required');
      return false;
    }

    if (startUnix < currUnix) {
      setStartTime(new Date());
    }
    
    if (endUnix < startUnix || endUnix < currUnix) {
      setError('Invalid listing dates and/or times');
      return false;
    }

    if ((endUnix - startUnix) < (3 * timeEstimate)) {
      setError('Listing time too short');
      return false;
    }

    if ((endUnix - startUnix) > 345600) {
      setError('Maximum listing length is 4 days');
    }

    setError('');
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
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

    if (!coordinates) {
      setError('Error geocoding address');
      return false;
    }

    const data = {
      comment,
      jobType,
      price,
      timeEstimate,
      startTime: Math.floor(startTime.getTime() / 1000),
      endTime: Math.floor(endTime.getTime() / 1000),
      address,
      coords,
    };
    const res = await api.post('/api/jobs/create-job', data);
    if (res.success) {
      toast.success("Success!");
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  return(
    <Container>
      <Form onSubmit={submit} className='mb-5'>
        <h1 className="text-center">List New Job</h1>
        <Form.Group className="mb-3">
          <Form.Label>Job Type*</Form.Label>
          <Form.Select id="job-type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required> 
            {
              jobTypes.map((jobType) => {
                return <option key={jobType.id} value={jobType.id}>{jobType.job_type}</option>
              })
            }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Compensation (Dollars)*</Form.Label>
          <Form.Control id="compensation" type="number" min="0.01" step="0.01" placeholder="16.50" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time Estimate (Hours)*</Form.Label>
          <Form.Control id="time-estimate" type="number" min="0.25" max="60" step=".25" placeholder="2.5" value={timeEstimate} onChange={(e) => setTimeEstimate(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Job Details*</Form.Label>
          <Form.Control className="job-desc" id="comment" as="textarea" rows="3" type="text" placeholder="E.g. garage door code, specific instructions, etc." value={comment} onChange={(e) => setComment(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <BasicDateTimePicker label="Listing Opens" onTimeChange={(e) => handleTimeChange(e, "start")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <BasicDateTimePicker label="Listing Ends" onTimeChange={(e) => handleTimeChange(e, "end")} />
        </Form.Group>

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
              <Form.Control id="name" type="text" placeholder="4205 Old Main Hill, Logan, UT 84322" value={address} onChange={(e) => setAddress(e.target.value)} />
              {
                coords ? 
                  <p>Leave blank to only store job location at coordinates {`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`} and ignore address.</p>
                  : null}
            </Col>
          </Row>
        </Form.Group>

        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}