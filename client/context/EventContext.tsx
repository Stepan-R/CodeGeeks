'use client';

import { deleteEvent, fetchAllEvents } from '@/api/fetchEvents';
import { Event } from '@/type/event';
import { sortedEvents } from '../utils/sortUtils';
import { EventsContextType, EventsProviderProps } from '@/type/eventsContextType';
import React, { createContext, useState, useEffect } from 'react';

const defaultContextValue = {
  events: [],
  loading: true,
  error: null,
  setEvents: () => {},
  handleDelete: async () => {},
  sortEvents: () => {}
};

export const EventsContext = createContext<EventsContextType>(defaultContextValue);

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState<string>('title');

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  }

  const sortEvents = (criteria: string) => {
    setSortCriteria(criteria);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <EventsContext.Provider value={{ 
        events: sortedEvents(events, sortCriteria),
        loading, 
        error,
        setEvents, 
        handleDelete, 
        sortEvents 
      }}>
      {children}
    </EventsContext.Provider>
  );
};