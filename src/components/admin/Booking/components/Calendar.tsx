"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayjs, { Dayjs } from "dayjs";
import AddNewBookModal from "./AddNewBookModal";
// import EditEventModal from "./EditModal";

type CalendarEvent = {
  start: Dayjs;
  end: Dayjs;
  resourceId?: string;
};

const resources = [
  { id: "1", title: "Номер 101" },
  { id: "2", title: "Номер 102" },
  { id: "3", title: "Номер 103" },
];

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);

  const handleCloseModals = () => {
    setIsNewBookModalOpen(false);
  };

  const handleSlotSelected = (info: any) => {
    console.log("Slot selected:", info);
    setCurrentEvent({
      start: dayjs(info.start),
      end: dayjs(info.end),
      resourceId: info.resource.id,
    });
    setIsNewBookModalOpen(true);
  };


  const updateExistingEvent = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.start === currentEvent?.start ? updatedEvent : event
      )
    );
  };

  // const deleteEvent = (start: Date) => {
  //   setEvents(events.filter((event) => event.start !== start));
  // };

  return (
    <div className="container">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
        ]}
        initialView="resourceTimelineWeek"
        events={events.map((event) => ({
          ...event,
          start: event.start.toDate(),
          end: event.end.toDate(),
        }))}
        resources={resources}
        selectable={true}
        editable={true}
        slotDuration={{ days: 1 }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "resourceTimelineWeek,resourceTimelineTwoWeeks,resourceTimelineMonth",
        }}
        buttonText={{
          resourceTimelineWeek: "week",
          resourceTimelineTwoWeeks: "two weeks",
          resourceTimelineMonth: "month",
        }}
        views={{
          resourceTimelineWeek: {
            slotLabelFormat: [
              { weekday: "short" },
              { day: "numeric", month: "short" },
            ],
            resourcesInitiallyExpanded: true,
          },
          resourceTimelineTwoWeeks: {
            type: "resourceTimeline",
            duration: { weeks: 2 },
            slotLabelFormat: [
              { weekday: "short" },
              { day: "numeric", month: "short" },
            ],
          },
          resourceTimelineMonth: {
            slotLabelFormat: [
              { weekday: "short" },
              { day: "numeric", month: "short" },
            ],
            resourcesInitiallyExpanded: true,
          },
        }}
        select={handleSlotSelected}
      />
      Модалка для нового события
      {currentEvent && (
        <AddNewBookModal
          open={isNewBookModalOpen}
          handleClose={handleCloseModals}
          currentEvent={currentEvent}
          
        />
      )}
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
