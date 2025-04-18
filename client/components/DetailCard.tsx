'use client';

import { Box, Typography } from '@mui/material';
import classes from '../styles/DetailCard.module.css';
import { Event } from '@/type/event';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '@/utils/dateUtils';
import { useThemeContext } from '@/context/ThemeContext';
import { GoogleMap } from './GoogleMap';

type Props = {
  event: Event;
  setUpdating: (value: boolean) => void;
  updating: boolean
}

export const DetailCard: React.FC<Props> = ({ event, setUpdating, updating }) => {
  const { theme } = useThemeContext();

  return (
    <div className={`${classes.layout} ${theme === 'dark' ? classes.dark : classes.light}`}>
      <div className={classes.detail_layout}>
        <div className={classes.map_container}>
          <GoogleMap city={event.location} />
        </div>
        <Typography component="div" className={classes.info}>
          <Box sx={{ fontWeight: 'bold', m: 1, fontSize: '2rem' }}>{event.title}</Box>
          <Box sx={{ fontWeight: 'regular', m: 1, fontSize: '1.5rem' }}>{event.category}</Box>
          <Box sx={{ fontWeight: 'medium', m: 1, fontSize: '1.5rem' }}>{formatDate(event.date)}</Box>
          <Box sx={{ fontWeight: 500, m: 1, fontSize: '1.5rem' }}>{event.location}</Box>
          <Box sx={{ fontWeight: 'regular', m: 1 }}>{event.description}</Box>
        </Typography>
        <EditIcon onClick={() => setUpdating(!updating)} className={classes.icon} />
      </div>
    </div>
  )
}