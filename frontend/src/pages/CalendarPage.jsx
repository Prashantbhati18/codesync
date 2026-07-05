// FullCalendar integration: shows contests on a calendar, click opens details.
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import useContests from '../hooks/useContests';

export default function CalendarPage() {
  const { contests } = useContests();

  const events = contests.map((c) => ({
    title: c.name,
    start: c.start_time,
    end: c.end_time,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contest Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => alert(info.event.title)}
      />
    </div>
  );
}
