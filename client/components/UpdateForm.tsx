'use client';

import React, { useContext, useState } from 'react';
import classes from '../styles/UpdatingForm.module.css'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { updateEvent } from '@/api/fetchEvents';
import { EventsContext } from '@/context/EventContext';
import { Event } from '@/type/event';
import { formatDateToInput } from '@/utils/dateUtils';

type Props = {
  updating: boolean;
  event: Event;
  id: number
}

export const UpdateForm: React.FC<Props> = ({ updating, event, id }) => {
  const { setEvents } = useContext(EventsContext);

  const updatedEvent = {
    id: event.id,
    title: event.title,
    category: event.category,
    location: event.location,
    date: event.date ? formatDateToInput(event.date) : '',
    description: event.description,
  };

  const [editedEvent, setEditedEvent] = useState(updatedEvent)
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedEventData = {
        ...editedEvent,
        date: new Date(editedEvent.date),
      };

      const updatedEvent = await updateEvent(id, updatedEventData);
      setEditedEvent(updatedEvent);
      setEvents((prevState) => prevState.map((event) => (event.id === id ? updatedEvent : event)));
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className={`sliding-component, ${updating ? 'visible' : 'hidden'}`}>
    <form  className={classes.form_block} onSubmit={handleUpdate}>
      <input 
        type='text'
        name='title'
        className={classes.input} 
        value={editedEvent.title}
        onChange={handleChange}
      />
      <input 
        type='text' 
        name='category'
        className={classes.input}
        value={editedEvent.category}
        onChange={handleChange}
      />
      <input 
        type='date' 
        name='date'
        className={classes.input}
        value={editedEvent.date}
        onChange={handleChange}
      />
      <input 
        type='text' 
        name='location'
        className={classes.input}
        value={editedEvent.location}
        onChange={handleChange}
      />
      <input 
        type='textarea'
        name='description'
        className={classes.input}
        value={editedEvent.description}
        onChange={handleChange}
      />

      <Button 
        type='submit' 
        variant="contained" 
        endIcon={<SendIcon />}
        disabled={loading}
      >
        Update
      </Button>
    </form>
    </div>
  )
}