'use client';

import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

type Props = {
  errorMessage: string
}

const ErrorModal: React.FC<Props> = ({ errorMessage }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleReload = () => {
    window.location.reload();
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {errorMessage || "An unexpected error occurred."}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" onClick={handleReload}>
            Reload Page
          </Button>
          <Button variant="contained" color="primary" onClick={handleHome}>
            Go Home
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
