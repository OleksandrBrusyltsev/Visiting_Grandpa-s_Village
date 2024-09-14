"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import NewEventModal from "./AddModal";
// import EditEventModal from "./EditModal";

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  desc?: string;
};

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);

  const handleCloseModals = () => {
    setIsNewEventModalOpen(false);
    setIsEditEventModalOpen(false);
  };

  const handleSlotSelected = (info: any) => {
    console.log(info);
    setCurrentEvent({
      title: "",
      start: info.start,
      end: info.end,
      desc: "",
    });
    setIsNewEventModalOpen(true);
  };

  const handleEventSelected = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setIsEditEventModalOpen(true);
  };

  const addNewEvent = (newEvent: CalendarEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateExistingEvent = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.start === currentEvent?.start ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (start: Date) => {
    setEvents(events.filter((event) => event.start !== start));
  };

  return (
    <div style={{ height: "100vh" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true}
        editable={true}
      />
      Модалка для нового события
      {/* {currentEvent && (
        <NewEventModal
          open={isNewEventModalOpen}
          handleClose={handleCloseModals}
          currentEvent={currentEvent}
          addNewEvent={addNewEvent}
        />
      )} */}
      {/* Модалка для редактирования события */}
      {/* {currentEvent && (
        <EditEventModal
          open={isEditEventModalOpen}
          handleClose={handleCloseModals}
          currentEvent={currentEvent}
          updateEvent={updateExistingEvent}
          deleteEvent={deleteEvent}
        />
      )} */}
    </div>
  );
};

export default MyCalendar;
