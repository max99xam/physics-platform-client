import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import { useStyles } from './navbar.styled';
import { Categories } from 'components';
import Link from "next/link";

const WAVE_OPTICS_NAME = 'ФИЗИКА | ВОЛНОВАЯ ОПТИКА';

export default function Navbar() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link href='/'>
            <Typography className={classes.title} variant="h5" noWrap>
              {WAVE_OPTICS_NAME}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Categories />
    </>
  );
}
