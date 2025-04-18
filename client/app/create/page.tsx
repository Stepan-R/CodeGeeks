'use client';

import { useContext, useState } from "react";
import classes from '../../styles/CreatePage.module.css';
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { EventsContext } from "@/context/EventContext";
import { createEvent } from "@/api/fetchEvents";

const CreatePage = () => {
  interface FormErrors {
    title?: string;
    category?: string;
    location?: string;
    date?: string;
    description?: string;
  }
  const { setEvents } = useContext(EventsContext);
  const formData = {
    title: '',
    category: '',
    location: '',
    date: '',
    description: '',
  };
  const [newEvent, setNewEvent] = useState(formData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!newEvent.title) newErrors.title = 'Title is required';
    if (!newEvent.category) newErrors.category = 'Category is required';
    if (!newEvent.location) newErrors.location = 'Location is required';
    if (!newEvent.date) newErrors.date = 'Date is required';
    if (!newEvent.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const newEventData = {
        ...newEvent,
        date: new Date(newEvent.date),
      };

      const createdEvent = await createEvent(newEventData);

      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      
      setNewEvent(formData);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.layout}>
      <form  className={classes.form_block} onSubmit={handlePost}>
        <TextField
          label="Title"
          name="title"
          value={newEvent.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
          margin="normal"
          sx={{ width: '45vw' }}
        />
        <TextField
          label="Category"
          name="category"
          value={newEvent.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
          fullWidth
          margin="normal"
          sx={{ width: '45vw' }}
        />
        <TextField
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          error={!!errors.date}
          helperText={errors.date}
          fullWidth
          margin="normal"
          sx={{ width: '45vw' }}
        /> 
        <TextField
          label="Location"
          name="location"
          value={newEvent.location}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location}
          fullWidth
          margin="normal"
          sx={{ width: '45vw' }}
        />
        <TextField
          label="Description"
          name='description'
          className={classes.input}
          value={newEvent.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
          margin="normal"
          sx={{ width: '45vw' }}
        />
        <Button
          type='submit' 
          variant="contained" 
          endIcon={<SendIcon />}
          disabled={loading}
          className={classes.btn}
          sx={{ width: '45vw' }}
        >
          Update
        </Button>
      </form>
    </div>
  )
}

export default CreatePage;