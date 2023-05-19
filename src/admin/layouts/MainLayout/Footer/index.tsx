import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#4CAF50',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF',
    zIndex: 9999,
  },
  copyright: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes. copyright}>
        <Typography variant="body2" component="span" color="inherit">
          &copy; Culturale-App 2023
        </Typography>
      </div>
    </footer>
  );
};
