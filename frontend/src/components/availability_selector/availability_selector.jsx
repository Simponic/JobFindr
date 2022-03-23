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
      const availabilities = [];
      for (let i = 0; i < availability.length; i++) {
        if (i < availability.length-1 && ((availability[i].day + 1) % 7) === availability[i+1].day && availability[i].end_hour === 23 && availability[i].end_minute === 59 && availability[i+1].start_hour === 0 && availability[i+1].start_minute === 0) {
          availabilities.push({
            start: moment().utc().day(availability[i].day).hour(availability[i].start_hour).minute(availability[i].start_minute).format(),
            end: moment().utc().day(availability[i+1].day).hour(availability[i+1].end_hour).minute(availability[i+1].end_minute).format(),
          });
          i += 1;
        } else {
          availabilities.push({
            start: moment().utc().day(availability[i].day).hour(availability[i].start_hour).minute(availability[i].start_minute).format(),
            end: moment().utc().day(availability[i].day).hour(availability[i].end_hour).minute(availability[i].end_minute).format(),
          });
        }
      }
      setInitialEvents(availabilities);
    } else if (res.message) {
      setError(res.message);
    }
  };

  const updateAvailability = async () => {
    const availabilities = [];
    for (let event of events) {
      const start = moment.utc(event.start);
      const end = moment.utc(event.end);
      if (start.weekday() === end.weekday()) {
        availabilities.push({
          day: start.weekday(),
          start_hour: start.hour(),
          start_minute: start.minute(),
          end_hour: end.hour(),
          end_minute: end.minute(),
        });
      } else {
        // In the worst case the availability is split into two days; no need to worry about anything longer
        availabilities.push({
          day: start.weekday(),
          start_hour: start.hour(),
          start_minute: start.minute(),
          end_hour: 23,
          end_minute: 59,
        });
        availabilities.push({
          day: end.weekday(),
          start_hour: 0,
          start_minute: 0,
          end_hour: end.hour(),
          end_minute: end.minute(),
        })
      }
    }
    const res = await api.post(`/api/worker/${id}/availabilities`, availabilities);

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
