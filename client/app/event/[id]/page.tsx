'use client';

import { fetchOneEvent } from "@/api/fetchEvents";
import { DetailCard } from "@/components/DetailCard";
import { UpdateForm } from "@/components/UpdateForm";
import { Event } from "@/type/event";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import classes from '../../../styles/DetailPage.module.css';
import { EventsContext } from "@/context/EventContext";
import { recommendSimilarEvents } from "@/utils/eventUtils";
import { SwiperBlock } from "@/components/SwiperBlock";
import ErrorModal from "@/components/ErrorModal";
import { Loader } from "@/components/Loader";

const DetailPage = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const { events, error, loading } = useContext(EventsContext);
  const id = Number(idParam);
  const [event, setEvent] = useState<Event | null>(null);
  const [updating, setUpdating] = useState(false);

  const similarEvents = event ? recommendSimilarEvents(event, events) : [];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetchOneEvent(+id);
          setEvent(response);
        }
        catch(error) {
          console.log(error);
        }
      }
    }

    fetchData();
  }, [id]);

  if (!event) {
    return;
  }

  if (loading) {
      return <Loader />
    }

  if (error) {
    return <ErrorModal errorMessage={error} />
  }

  return (
    <div className={classes.container}>
      <div className={classes.layout}>
        <DetailCard
          event={event} 
          setUpdating={setUpdating} 
          updating={updating}
        />
        {updating && <UpdateForm updating={updating} event={event} id={id} />}
      </div>
      <SwiperBlock similarEvents={similarEvents}/>
    </div>

  )
}

export default DetailPage;