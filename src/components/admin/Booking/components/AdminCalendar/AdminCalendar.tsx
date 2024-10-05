"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import ukLocale from "@fullcalendar/core/locales/uk";

import dayjs, { Dayjs } from "dayjs";
import { houses } from "../../../../../data/houses/index";
import AddNewBookModal from "../AddNewBookModal";
import s from "./AdminCalendar.module.scss";

type CalendarEvent = {
  start: Dayjs;
  end: Dayjs;
  resourceId?: string;
};

const resources = houses.map((house) => {
  const ukTitle = house.title.find((t) => t.language === "uk");

  const roomTitles = house.rooms.map((room) => {
    const ukRoomTitle = room.title.find((t) => t.language === "uk");
    return {
      id: room.name,
      title: ukRoomTitle?.text || room.name,
    };
  });

  if (house.name === "khoromy") {
    return roomTitles;
  }

  const houseResource = {
    id: house.name,
    title: ukTitle?.text || house.name,
  };

  return [houseResource, ...roomTitles];
});

const allResources = resources.flat();

const AdminCalendar: React.FC = () => {
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

  return (
    <div className="admin-calendar-container">
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
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
        resources={allResources}
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
          resourceTimelineWeek: "тиждень",
          resourceTimelineTwoWeeks: "два тижні",
          resourceTimelineMonth: "місяць",
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
        resourceAreaHeaderContent="Номери"
        select={handleSlotSelected}
        locale={ukLocale}
        expandRows={true}
      />
      Модалка для нового события
      {/* {currentEvent && (
        <AddNewBookModal
          open={isNewBookModalOpen}
          handleClose={handleCloseModals}
          currentEvent={currentEvent}
        />
      )} */}
    </div>
  );
};

export default AdminCalendar;
