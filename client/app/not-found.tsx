import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        This page could not be found
      </Typography>
      <Typography variant="body1" mb={3}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go to Homepage
        </Button>
      </Link>
    </Box>
  );
}

