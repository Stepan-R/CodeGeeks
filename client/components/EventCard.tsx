'use client';

import { Event } from "@/type/event";
import { formatDate } from "@/utils/dateUtils";
import { Box, Button, Card, CardActions, CardContent, Typography, Modal } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { EventsContext } from "@/context/EventContext";

type Props = {
  event: Event
}

export const EventCard: React.FC<Props> = ({ event }) => {
  const { handleDelete } = useContext(EventsContext);
  const [openModal, setOpenModal] = useState(false);
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {bull}{event?.location}{bull}{formatDate(event.date)}
        </Typography>
        <Typography variant="h5" component="div">
          {bull}{event?.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{event?.category}</Typography>
        <Typography variant="body2">
          {event?.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/event/${event.id}`}>
          <Button size="small">Learn More</Button>
        </Link>
        <Button 
          variant="outlined" 
          startIcon={<DeleteIcon />}
          onClick={() => setOpenModal(true)}
        >
          Delete
        </Button>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this event?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(event.id)}>
              Confirm Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}