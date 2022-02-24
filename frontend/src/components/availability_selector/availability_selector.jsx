import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { APIUserContext } from "../../services/api";
import toast from 'react-hot-toast';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export const AvailabilitySelector = () => {
  const api = useContext(APIUserContext);
  const { id } = useParams();
  const [error, setError] = useState('');
  const [availability, setAvailability] = useState([]);

  const updateAvailability = async (e) => {
    e.preventDefault();
    let body = [
      {
        day: 0,
        start_hour: 1,
        start_minute: 0,
        end_hour: 2,
        end_minute: 0
      },
      {
        day: 2,
        start_hour: 2,
        start_minute: 0,
        end_hour: 3,
        end_minute: 0
      },
    ];
    const res = await api.post(`/api/worker/${id}/availabilities`, body);

    if (res.success) {
      toast.success('Availability updated successfully.');
    }
    else if (res.message) {
      setError(res.message);
    }
  }

  return (
  <div className="mx-5">
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
      <Form onSubmit={updateAvailability}>
        <h1 className="text-center">Worker Availability</h1>
        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  )
}
