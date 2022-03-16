import { BasicDateTimePicker } from "./time_picker"
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export const JobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [price, setPrice] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [address, setAddress] = useState('');

  return(
    <Container className='mx-5'>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Listing Title*</Form.Label>
          <Form.Control id="title" type="text" placeholder="Lawn mowing gig near USU!" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Compensation (Dollars)*</Form.Label>
          <Form.Control id="compensation" type="text" placeholder="16.50" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time Estimate (Hours)*</Form.Label>
          <Form.Control id="time-estimate" type="text" placeholder="2.5" value={timeEstimate} onChange={(e) => setTimeEstimate(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address*</Form.Label>
          <Form.Control id="address" type="text" placeholder="4205 Old Main Hill, Logan, UT 84322" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </Form.Group>
        
        <Container>
          <BasicDateTimePicker label="Start Time" />
          <BasicDateTimePicker label="End Time"/>
        </Container>

        {/* <p className="text-danger">{error}</p> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}