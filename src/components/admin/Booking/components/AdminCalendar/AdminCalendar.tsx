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
import allResources from "./components/Resources";
import AddNewBookModal from "./components/AddNewBookModal";

type CalendarEvent = {
  start: Dayjs;
  end: Dayjs;
  houseName: string;
  houseId: string;
};

const AdminCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);

  const getResourceTitleById = (resourceId: string) => {
    // Ищем по ресурсам
    for (const house of houses) {
      if (house.name === resourceId) {
        // Если это домик, возвращаем заголовок домика
        const ukTitle = house.title.find((t) => t.language === "uk");
        return ukTitle?.text || house.name;
      }

      // Ищем по комнатам внутри домика
      const room = house.rooms.find((room) => room.name === resourceId);
      if (room) {
        const ukRoomTitle = room.title.find((t) => t.language === "uk");
        return ukRoomTitle?.text || room.name;
      }
    }

    // Если ресурс не найден, возвращаем ID как fallback
    return resourceId;
  };

  const handleCloseModals = () => {
    setIsNewBookModalOpen(false);
  };

  const handleSlotSelected = (info: any) => {
    console.log("Slot selected:", info);

    const resourceTitle = getResourceTitleById(info.resource.id); // Получаем украинский заголовок

    setCurrentEvent({
      start: dayjs(info.start),
      end: dayjs(info.end),
      houseName: resourceTitle,
      houseId: info.resource.id,
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

      {currentEvent && (
        <AddNewBookModal
          open={isNewBookModalOpen}
          handleClose={handleCloseModals}
          currentEvent={currentEvent}
        />
      )}
    </div>
  );
};

export default AdminCalendar;
