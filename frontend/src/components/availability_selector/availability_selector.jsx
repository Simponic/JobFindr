import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { APIUserContext } from "../../services/api";
import toast from 'react-hot-toast';

export const AvailabilitySelector = () => {
  const api = useContext(APIUserContext);
  const { id } = useParams();
  const [error, setError] = useState('');
  const [sunStartTime, setSunStartTime] = useState('');
  const [sunEndTime, setSunEndTime] = useState('');
  const [monStartTime, setMonStartTime] = useState('');
  const [monEndTime, setMonEndTime] = useState('');
  const [tuesStartTime, setTuesStartTime] = useState('');
  const [tuesEndTime, setTuesEndTime] = useState('');
  const [wedStartTime, setWedStartTime] = useState('');
  const [wedEndTime, setWedEndTime] = useState('');
  const [thursStartTime, setThursStartTime] = useState('');
  const [thursEndTime, setThursEndTime] = useState('');
  const [friStartTime, setFriStartTime] = useState('');
  const [friEndTime, setFriEndTime] = useState('');
  const [satStartTime, setSatStartTime] = useState('');
  const [satEndTime, setSatEndTime] = useState('');

  const updateAvailability = async (e) => {
    e.preventDefault();
    let body = {
      sunday: {
      day: '0',
      start_hour: sunStartTime[0],
      start_minute:  sunStartTime[1],
      end_hour: sunEndTime[0],
      end_minute: sunEndTime[1],
      worker_id: id,
      },
      monday: {
        day: '1',
        start_hour: monStartTime[0],
        start_minute:  monStartTime[1],
        end_hour: monEndTime[0],
        end_minute: monEndTime[1],
        worker_id: id,
      },
      tuesday: {
        day: '2',
        start_hour: tuesStartTime[0],
        start_minute:  tuesStartTime[1],
        end_hour: tuesEndTime[0],
        end_minute: tuesEndTime[1],
        worker_id: id,
      },
      wednesday: {
        day: '3',
        start_hour: wedStartTime[0],
        start_minute:  wedStartTime[1],
        end_hour: wedEndTime[0],
        end_minute: wedEndTime[1],
        worker_id: id,
      },
      thursday: {
        day: '4',
        start_hour: thursStartTime[0],
        start_minute:  thursStartTime[1],
        end_hour: thursEndTime[0],
        end_minute: thursEndTime[1],
        worker_id: id,
      },
      friday: {
        day: '5',
        start_hour: friStartTime[0],
        start_minute:  friStartTime[1],
        end_hour: friEndTime[0],
        end_minute: friEndTime[1],
        worker_id: id,
      },
      saturday: {
        day: '6',
        start_hour: satStartTime[0],
        start_minute:  satStartTime[1],
        end_hour: satEndTime[0],
        end_minute: satEndTime[1],
        worker_id: id,
      },
    };
    const res = await api.post(`/api/worker/${id}/availabilities`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },   
      body: body
    });

    if (res.success) {
      toast.success('Availability updated successfully.');
    }
    else if (res.message) {
      setError(res.message);
    }
  }

  return (
  <div className="mx-5">
      <Form onSubmit={updateAvailability}>
        <h1 className="text-center">Worker Availability</h1>
        <Form.Group className="mb-3" controlId="availForm">
          <Form.Label>Sunday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setSunStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setSunEndTime(e.target.value.split(":"))} required />
          </div>

          <Form.Label>Monday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setMonStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setMonEndTime(e.target.value.split(":"))} required />
          </div>

          <Form.Label>Tuesday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setTuesStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setTuesEndTime(e.target.value.split(":"))} required />
          </div>

          <Form.Label>Wednesday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setWedStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setWedEndTime(e.target.value.split(":"))} required />
          </div>

          <Form.Label>Thursday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setThursStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setThursEndTime(e.target.value.split(":"))} required />
          </div>

          <Form.Label>Friday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setFriStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setFriEndTime(e.target.value.split(":"))} required />
          </div>

          <Form.Label>Saturday</Form.Label>
          <div>
          <p className="avail_form">Start Time: </p> 
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setSatStartTime(e.target.value.split(':'))} required />
          </div>
          <div>
          <p className="avail_form">End Time: </p>
          <Form.Control className="avail_form" type="time" min="0" max="23" onChange={(e) => setSatEndTime(e.target.value.split(":"))} required />
          </div>
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  )
}
