"use client";
import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import ukLocale from "@fullcalendar/core/locales/uk";
import dayjs, {Dayjs} from "dayjs";
import allResources from "./components/Resources";
import AddNewBookModal from "./components/AddNewBookModal";
import {houses} from "@/data/houses";

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
        for (const house of houses) {
            if (house.name === resourceId) {
                return house.title.uk || house.name;
            }
        }

        return resourceId;
    };

    const handleCloseModals = () => {
        setIsNewBookModalOpen(false);
    };

    const openNewBookingModal = () => {
        setCurrentEvent(null);
        setIsNewBookModalOpen(true);
    };

    const handleSlotSelected = (info: any) => {
        const resourceTitle = getResourceTitleById(info.resource.id);

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
                slotDuration={{days: 1}}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right:
                        "addEventButton,resourceTimelineWeek,resourceTimelineTwoWeeks,resourceTimelineMonth",
                }}
                buttonText={{
                    resourceTimelineWeek: "тиждень",
                    resourceTimelineTwoWeeks: "два тижні",
                    resourceTimelineMonth: "місяць",
                }}
                views={{
                    resourceTimelineWeek: {
                        slotLabelFormat: [
                            {weekday: "short"},
                            {day: "numeric", month: "short"},
                        ],
                        resourcesInitiallyExpanded: true,
                    },
                    resourceTimelineTwoWeeks: {
                        type: "resourceTimeline",
                        duration: {weeks: 2},
                        slotLabelFormat: [
                            {weekday: "short"},
                            {day: "numeric", month: "short"},
                        ],
                    },
                    resourceTimelineMonth: {
                        slotLabelFormat: [
                            {weekday: "short"},
                            {day: "numeric", month: "short"},
                        ],
                        resourcesInitiallyExpanded: true,
                    },
                }}
                resourceAreaHeaderContent="Номери"
                select={handleSlotSelected}
                locale={ukLocale}
                expandRows={true}
                customButtons={{
                    addEventButton: {
                        text: "Додати бронювання",
                        click: () => {
                            setCurrentEvent({
                                start: dayjs(),
                                end: dayjs().add(1, "day"),
                                houseName: "",
                                houseId: "",
                            });
                            setIsNewBookModalOpen(true);
                        },
                    },
                }}
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
