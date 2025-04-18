'use client';

import { useThemeContext } from "@/context/ThemeContext";
import { FormControlLabel, Switch } from "@mui/material"

export const Switcher = () => {
    const { toggleTheme, theme } = useThemeContext();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          name="darkModeToggle"
          color="primary"
        />
      }
    label="Toggle Dark Mode"
     />
  )
}