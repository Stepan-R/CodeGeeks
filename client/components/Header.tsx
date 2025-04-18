'use client';

import { Switcher } from "./Switcher";
import HomeIcon from '@mui/icons-material/Home';
import classes from '../styles/Header.module.css';
import { useThemeContext } from "@/context/ThemeContext";
import { AddEventBtn } from "./AddEventBtn";
import Link from "next/link";

export const Header = () => {
  const { theme } = useThemeContext();

  return (
    <div className={`${classes.layout} ${theme === 'dark' ? classes.dark : classes.light}`}>
      <Link
        href='/'
      >
      <HomeIcon color="primary" sx={{ fontSize: 40 }} />
      </Link>
      <div className={classes.block}>
        <AddEventBtn />
        <Switcher />
      </div>
    </div>
  )
}