'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type Props = {
  city: string;
};

export const GoogleMap: React.FC<Props> = ({ city }) => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_KEY;
  const GOOGLE_URL = process.env.NEXT_PUBLIC_GOOGLE_URL;

  if (!key || !GOOGLE_URL) {
    throw Error("API key or URL is not defined in the environment variables.");
  }

  const [markerPosition, setMarkerPosition] = useState({ lat: 43.64, lng: -79.41 });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async (city: string) => {
      const geocodeUrl = `${GOOGLE_URL}${encodeURIComponent(city)}&key=${key}`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setMarkerPosition({ lat, lng });
        } else {
          console.error('Geocoding error:', data.status);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates(city);
  }, [city]);

  const handleMarkerClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <APIProvider apiKey={key}>
        <Map center={markerPosition} zoom={10} draggable>
          <Marker position={markerPosition} onClick={handleMarkerClick} />
        </Map>
      </APIProvider>

      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Marker Info</DialogTitle>
        <DialogContent>
          You clicked on the marker for <strong>{city}</strong>.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


