import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { APIUserContext } from "../../services/api";
import moment from 'moment';
import toast from 'react-hot-toast';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect } from "react";

export const AvailabilitySelector = () => {
  const api = useContext(APIUserContext);
  const { id } = useParams();
  const [error, setError] = useState('');
  const [initialEvents, setInitialEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await api.get(`/api/worker/${id}/availabilities`);
    if (res.success) {
      const availability = res.availability;
      const l = availability.map(av => {
        return {
          start: moment().day(av.day).hour(av.start_hour).minute(av.start_minute).format(),
          end: moment().day(av.day).hour(av.end_hour).minute(av.end_minute).format(),
        }
      });
      setInitialEvents(l);
    } else if (res.message) {
      setError(res.message);
    }
  };

  const updateAvailability = async () => {
    const res = await api.post(`/api/worker/${id}/availabilities`, events.map(x => {
      const start = moment(x.start);
      const end = moment(x.end);
      return {
        day: start.weekday(),
        start_hour: start.hour(),
        end_hour: end.hour(),
        start_minute: start.minute(),
        end_minute: end.minute()
      };
    }));

    if (res.success) {
      toast.success('Availability updated successfully.');
    }
    else if (res.message) {
      setError(res.message);
    }
  };

  const onDateClick = (arg) => {
    const calendarApi = arg.view.calendar;
    calendarApi.addEvent({
      start: arg.startStr,
      end: arg.endStr,
    })
  };

  const handleEventClick = (info) => {
    info.event.remove();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-center">Worker Availability</h1>
      <div className="mx-5">
        <p className="text-danger">{error}</p>
        <FullCalendar
          plugins={[ timeGridPlugin , interactionPlugin ]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
          editable={true}
          selectable={true}
          dayHeaderFormat={{ weekday: 'long' }}
          select={onDateClick}
          allDaySlot={false}
          slotMinTime={'08:00:00'}
          slotMaxTime={'20:00:00'}
          events={initialEvents}
          eventsSet={(e) => { setEvents(e); }}
          eventClick={handleEventClick}
        />
        <Button variant="primary" onClick={updateAvailability}>
          Save
        </Button>
      </div>
    </div>
  )
}
