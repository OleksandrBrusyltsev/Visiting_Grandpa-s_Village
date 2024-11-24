// "use client";
// import { useState } from "react";
// import { Dialog, TextField, Button, ButtonGroup } from "@mui/material";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import moment from "moment";

// type CalendarEvent = {
//   title: string;
//   start: Date;
//   end: Date;
//   desc?: string;
// };

// type ModalProps = {
//   open: boolean;
//   handleClose: () => void;
//   currentEvent: CalendarEvent;
//   setNewAppointment?: (newEvent: CalendarEvent) => void;
//   updateEvent?: (updatedEvent: CalendarEvent) => void;
//   deleteEvent?: (start: Date) => void;
// };

// const EditModal: React.FC<ModalProps> = ({
//   open,
//   handleClose,
//   currentEvent,
//   updateEvent,
//   deleteEvent,
// }) => {
//   const [title, setTitle] = useState(currentEvent.title);
//   const [desc, setDesc] = useState(currentEvent.desc);
//   const [start, setStart] = useState<Date>(currentEvent.start || new Date());
//   const [end, setEnd] = useState<Date>(currentEvent.end || new Date());

//   const handleUpdate = () => {
//     updateEvent({ title, desc, start, end });
//     handleClose();
//   };

//   const handleDelete = () => {
//     deleteEvent(start);
//     handleClose();
//   };

//   return (
//     <Dialog
//       title={`View/Edit Appointment on ${moment(start).format("MMMM Do YYYY")}`}
//       open={open}
//       onClose={handleClose}
//     >
//       <TextField
//         label="Title"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//       />
//       <br />
//       <TextField
//         label="Description"
//         onChange={(e) => setDesc(e.target.value)}
//         value={desc}
//       />
//       <TimePicker
//         format="ampm"
//         label="Start Time"
//         minutesStep={5}
//         value={start}
//         onChange={(newValue) => setStart(newValue)}
//       />
//       <TimePicker
//         format="ampm"
//         label="End Time"
//         minutesStep={5}
//         value={end}
//         onChange={(newValue) => setEnd(newValue)}
//       />

//       <ButtonGroup variant="contained" aria-label="Basic button group">
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleDelete}>Delete</Button>
//         <Button onClick={handleUpdate}>Edit</Button>
//       </ButtonGroup>
//     </Dialog>
//   );
// };

// export default EditModal;
