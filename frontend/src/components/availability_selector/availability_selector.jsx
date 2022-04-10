import { Button, Container, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { APIUserContext } from "../../services/api";
import moment from 'moment';
import toast from 'react-hot-toast';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect } from "react";
import { JobType } from "./job_type";

export const AvailabilitySelector = () => {
  const api = useContext(APIUserContext);
  const { id } = useParams();
  const [initialEvents, setInitialEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);

  const icons = require('react-icons/gi');

  const fetchJobTypes = async () => {
    const res = await api.get('/api/jobs/job-types');
    if (res.success) {
      setJobTypes(res.job_types);
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  const fetchAvailability = async () => {
    const res = await api.get(`/api/worker/${id}/availabilities`);
    if (res.success) {
      setSelectedJobTypes(res.jobtypes);
      const availability = res.availability;
      const availabilities = [];
      for (let i = 0; i < availability.length; i++) {
        if (i < availability.length-1 && ((availability[i].day + 1) % 7) === availability[i+1].day && availability[i].end_hour === 23 && availability[i].end_minute === 59 && availability[i+1].start_hour === 0 && availability[i+1].start_minute === 0) {
          availabilities.push({
            start: moment().utc().day(availability[i].day).hour(availability[i].start_hour).minute(availability[i].start_minute).format(),
            end: (availability[i].day == 6 && availability[i+1].day == 0 ? moment().add(1, 'weeks') : moment()).utc().day(availability[i+1].day).hour(availability[i+1].end_hour).minute(availability[i+1].end_minute).format(),
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
      toast.error(res.message);
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
      } else if (start.weekday() === (((end.weekday() - 1) % 7) + 7) % 7)  {
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
      } else {
        toast.error('Availability can only be split into two days');
        return;
      }
    }
    const res = await api.post(`/api/worker/${id}/availabilities`, { availabilities , jobtypes: selectedJobTypes.map((x) => x.id) });

    if (res.success) {
      toast.success('Availability updated successfully.');
    }
    else if (res.message) {
      toast.error(res.message);
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
    fetchJobTypes();
    fetchAvailability();
  }, []);

  const toggleSelect = (jobType) => {
    if (selectedJobTypes.find((s) => s.id == jobType.id)) {
      setSelectedJobTypes(selectedJobTypes.filter((s) => s.id != jobType.id));
    } else {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    }
  }

  return (
    <div>
      <h1 className="text-center mt-5">Worker Availability</h1>
      <div className="mx-5">
        <Container>
          <Row className="job-type-scroll scrollbar-primary">
            {jobTypes.map((jobType) => 
              <JobType key={jobType.id} jobType={jobType} selected={selectedJobTypes.find((s) => s.id == jobType.id)} onSelected={() => toggleSelect(jobType)} icon={icons[jobType.icon]} />
            )}
          </Row>
        </Container>
        <FullCalendar
          plugins={[ timeGridPlugin , interactionPlugin ]}
          height="auto"
          initialView="timeGridWeek"
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
          editable={true}
          selectable={true}
          dayHeaderFormat={{ weekday: 'short' }}
          select={onDateClick}
          allDaySlot={false}
          slotMinTime={'08:00:00'}
          slotMaxTime={'20:00:00'}
          events={initialEvents}
          initialDate={moment().utc().weekday(6).format()}
          eventsSet={(e) => { setEvents(e); }}
          eventClick={handleEventClick}
        />
        <br />
        <Button variant="primary" className="mb-5" onClick={updateAvailability}>
          Save
        </Button>
      </div>
    </div>
  )
}
