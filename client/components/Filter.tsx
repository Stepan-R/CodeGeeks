'use client';

import React, { useState, useRef, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EventsContext } from '@/context/EventContext';

const options = ['Title', 'Category', 'Date', 'Location'];

export const AutocompleteHint = () => {
  const hint = useRef('');
  const [inputValue, setInputValue] = useState('');
  const { sortEvents } = useContext(EventsContext);

  return (
    <Autocomplete
      onKeyDown={(event) => {
        if (event.key === 'Tab' && hint.current) {
          setInputValue(hint.current);
          event.preventDefault();
        }
      }}
      onClose={() => { hint.current = ''; }}
      onChange={(event, newValue) => {
        setInputValue(newValue || '');
        sortEvents(newValue ? newValue.toLowerCase() : 'title');
      }}
      inputValue={inputValue}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <Box sx={{ position: 'relative' }}>
          <Typography
            sx={{
              position: 'absolute',
              opacity: 0.5,
              left: 14,
              top: 16,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: 'calc(100% - 75px)',
            }}
          >
            {hint.current}
          </Typography>
          <TextField
            {...params}
            onChange={(event) => {
              const newValue = event.target.value;
              setInputValue(newValue);
              const matchingOption = options.find(option =>
                option.toLowerCase().startsWith(newValue.toLowerCase())
              );
              hint.current = matchingOption || '';
            }}
            label="Select Option"
          />
        </Box>
      )}
    />
  );
}