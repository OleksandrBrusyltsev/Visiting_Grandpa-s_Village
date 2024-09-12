"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import NewEventModal from "./AddModal";
// import EditEventModal from "./EditModal";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

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

  const handleSlotSelected = (slotInfo: SlotInfo) => {
    setCurrentEvent({
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
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
    <div id="Calendar" style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        views={["month", "week", "day", "agenda"]}
        timeslots={2}
        defaultView="month"
        defaultDate={new Date()}
        selectable
        onSelectEvent={handleEventSelected}
        onSelectSlot={handleSlotSelected}
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
