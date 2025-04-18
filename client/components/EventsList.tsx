'use client';

import React, { useContext } from "react";
import { EventCard } from "./EventCard";
import { EventsContext } from "@/context/EventContext";
import { Loader } from "./Loader";
import ErrorModal from "./ErrorModal";

export const EventsList = () => {
  const { events, loading, error } = useContext(EventsContext);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorModal errorMessage={error} />
  }

  return (
    <>
      {events.map(event => (
        <EventCard event={event} key={event.id}/>
      ))}
    </>
  )
}