import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';

export const WorkerSchedule = ({ workerEvents, onEventClick }) => {
  return (
    <>
      <h1>Assignments</h1>
      <FullCalendar
        plugins={[ timeGridPlugin , interactionPlugin ]}
        initialView="timeGridWeek"
        editable={false}
        selectable={true}
        dayHeaderFormat={{ weekday: 'short' }}
        allDaySlot={false}
        slotMinTime={'08:00:00'}
        slotMaxTime={'20:00:00'}
        events={workerEvents}
        eventClick={onEventClick}
      />
    </>
  )
}