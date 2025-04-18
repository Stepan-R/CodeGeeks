'use client';

import { Event } from "@/type/event";
import { EventCard } from "./EventCard";
import { Box, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";

type Props = {
  similarEvents: Event[]
}

export const SwiperBlock: React.FC<Props> = ({ similarEvents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % similarEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + similarEvents.length) % similarEvents.length);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Button onClick={prevSlide}>Previous</Button>
      
      <Card>
        <CardContent>
          <EventCard event={similarEvents[currentIndex]} />
        </CardContent>
      </Card>

      <Button onClick={nextSlide}>Next</Button>
    </Box>
  );
}