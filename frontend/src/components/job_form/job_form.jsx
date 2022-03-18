import { BasicDateTimePicker } from "./time_picker"
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const JobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [price, setPrice] = useState(0);
  const [timeEstimate, setTimeEstimate] = useState(0);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

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

    if (!jobTitle) {
      setError('Job title is required');
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

    if (!address) {
      setError('Address is required');
      return false;
    }

    if (startUnix < currUnix) {
      setStartTime(new Date());
    }
    
    if (endUnix < startUnix || endUnix < currUnix) {
      setError('Invalid listing dates and/or times');
      return false;
    }

    if (endUnix - startUnix < 172800) {
      setError('Listing time too short, must be up for at least 2 days')
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return false;
    }
    // Check that user has enough money
    // Convert Dates to UNIX in the post body with Math.floor(startTime.getTime() / 1000);
    // I think we're using jobtitle as 'comment' in the db
    toast.success("Success!");
  }

  return(
    <Container className='mx-5'>

      <Form onSubmit={submit}>
        <h1 className="text-center">List New Job</h1>
        <Form.Group className="mb-3">
          <Form.Label>Listing Title*</Form.Label>
          <Form.Control id="title" type="text" placeholder="Lawn mowing gig near USU!" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Job Type*</Form.Label>
          <Form.Control id="job-type"
            as="select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          required> 
          {/* MAP JOBTYPE OPTIONS HERE */}
            <option value="Example Type 1">Example Type 1</option>
            <option value="Example Type 2">Example Type 2</option>
            <option value="Example Type 3">Example Type 3</option>
            <option value="Example Type 4">Example Type 4</option>
          </Form.Control>
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
          <Form.Label>Address*</Form.Label>
          <Form.Control id="address" type="text" placeholder="4205 Old Main Hill, Logan, UT 84322" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </Form.Group>
        
        <Form.Group className="mb-4">
          <BasicDateTimePicker label="Listing Opens" onTimeChange={(e) => handleTimeChange(e, "start")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <BasicDateTimePicker label="Listing Ends" onTimeChange={(e) => handleTimeChange(e, "end")} />
        </Form.Group>

        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}