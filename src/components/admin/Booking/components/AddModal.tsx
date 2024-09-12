// "use client";
// import { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import moment from "moment";

// type CalendarEvent = {
//   title: string;
//   start: Date;
//   end: Date;
//   desc?: string;
// };

// type NewEventModalProps = {
//   open: boolean;
//   handleClose: () => void;
//   currentEvent: CalendarEvent;
//   addNewEvent: (newEvent: CalendarEvent) => void;
// };

// const AddModal: React.FC<NewEventModalProps> = ({
//   open,
//   handleClose,
//   currentEvent,
//   addNewEvent,
// }) => {
//   const [title, setTitle] = useState(currentEvent.title);
//   const [desc, setDesc] = useState(currentEvent.desc || "");
//  const [start, setStart] = useState<Date | null>(currentEvent.start || null);
//  const [end, setEnd] = useState<Date | null>(currentEvent.end || null);

// const handleSubmit = () => {
//   if (start && end) {
//     addNewEvent({ title, desc, start, end });
//     handleClose();
//   } else {
//     console.error("Start and End times are required!");
//   }
// };


//   return (
//     <Dialog
//       title={`Book an appointment on ${moment(currentEvent.start).format(
//         "MMMM Do YYYY"
//       )}`}
//       open={open}
//       onClose={handleClose}
//     >
//       <TextField
//         label="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <br />
//       <TextField
//         label="Description"
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)}
//       />
//       <TimePicker
//         label="Start Time"
//         value={start}
//         onChange={(newValue) => setStart(newValue)}
//       />
//       <TimePicker
//         floatingLabelText="End Time"
//         value={end}
//         onChange={(newValue) => setEnd(newValue)}
//       />
//       <Button variant="contained" onClick={handleClose}>
//         Cancel
//       </Button>
//       <Button variant="outlined" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Dialog>
//   );
// };

// export default AddModal;
