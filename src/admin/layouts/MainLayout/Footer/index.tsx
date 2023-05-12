import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#4CAF50',
    position: 'absolute',
    width: '70%',
    marginLeft: '200px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF',
    bottom: 0,
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
      <div className={classes.copyright}>
        <Typography variant="body2" component="span" color="inherit">
          &copy; Culturale-App 2023
        </Typography>
      </div>
      <Typography variant="body2" component="span" color="inherit">
        Admin Webapp
      </Typography>
    </footer>
  );
};

