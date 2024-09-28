"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayjs, { Dayjs } from "dayjs";
import { houses } from "../../../../../data/houses/index";
import AddNewBookModal from "../AddNewBookModal";
import s from "./AdminCalendar.module.scss";



type CalendarEvent = {
  start: Dayjs;
  end: Dayjs;
  resourceId?: string;
};

// const resources = [
//   { id: "1", title: "Номер 101" },
//   { id: "2", title: "Номер 102" },
//   { id: "3", title: "Номер 103" },
// ];

const resources = houses.map((house) => {
  // Ищем украинский текст в основном заголовке дома
  const ukTitle = house.title.find((t) => t.language === "uk");

  // Ищем украинский текст в комнатах, если они есть
  const roomTitles = house.rooms.map((room) => {
    const ukRoomTitle = room.title.find((t) => t.language === "uk");
    return {
      id: room.name,
      title: ukRoomTitle?.text || room.name, // Используем украинский текст, если он найден
    };
  });

  // Если дом называется "khoromy", добавляем только комнаты
  if (house.name === "khoromy") {
    return roomTitles; // Возвращаем только ресурсы для комнат
  }

  // Основной ресурс для дома (если это не "khoromy")
  const houseResource = {
    id: house.name,
    title: ukTitle?.text || house.name, // Если украинский текст не найден, используем имя
  };

  // Возвращаем ресурсы для дома и комнат
  return [houseResource, ...roomTitles];
});

// Объединяем все ресурсы в один массив
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
    </div>
  );
};

export default AdminCalendar;
