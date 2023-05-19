import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Alert } from '@mui/material';
import { Event } from '../../models/Event/event';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8082';

const Events: React.FC = () => {
  const [event, setEvent] = useState<Event>({
    codi: 0,
    denominacio: '',
    descripcio: '',
    dataIni: new Date(),
    dataFi: new Date(),
    horari: '',
    adress: '',
    lat: 0,
    long: 0,
    price: '',
    url: '',
    photo: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'codi' || name === 'lat' || name === 'long' ? parseInt(value) : value;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${SERVER_URL}/events/create`, event)
    .then(response => {
        setSuccessMessage('Evento creado correctamente');
        console.log(response.data);
        setEvent({
            codi: 0,
            denominacio: '',
            descripcio: '',
            dataIni: new Date(),
            dataFi: new Date(),
            horari: '',
            adress: '',
            lat: 0,
            long: 0,
            price: '',
            url: '',
            photo: '',
          });
    }).catch(err => {
        setErrorMessage('Error al crear el evento');
        console.log(err.errors);
    })
  };

  const handleSuccessClose = () => {
    setSuccessMessage('');
  };
  
  const handleErrorClose = () => {
    setErrorMessage('');
  };

  return (
    <Container maxWidth="sm" style={{marginTop: '20px', marginBottom: '60px'}}>
        <Typography variant="h4" align="center" gutterBottom>
        Creación de eventos
      </Typography>
      {successMessage && (
    <Alert severity="success" onClose={handleSuccessClose} sx={{ marginBottom: '10px' }}>
      {successMessage}
    </Alert>
  )}
  {errorMessage && (
    <Alert severity="error" onClose={handleErrorClose} sx={{ marginBottom: '10px' }}>
      {errorMessage}
    </Alert>
  )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type='number'
              label="Codi"
              name="codi"
              value={event.codi}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Denominació"
              name="denominacio"
              value={event.denominacio}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripció"
              name="descripcio"
              value={event.descripcio}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data Inici"
              type="date"
              name="dataIni"
              value={event.dataIni.toISOString().split('T')[0]}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data Fi"
              type="date"
              name="dataFi"
              value={event.dataFi.toISOString().split('T')[0]}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Horari"
              name="horari"
              value={event.horari}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Adreça"
              name="adress"
              value={event.adress}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type='number'
              label="Latitud"
              name="lat"
              value={event.lat}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type='number'
              label="Longitud"
              name="long"
              value={event.long}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Preu"
              name="price"
              value={event.price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL"
              name="url"
              value={event.url}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='file'
              name="photo"
              value={event.photo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{marginTop: '15px'}}>
          Crear Evento
        </Button>
      </form>
    </Container>
  );
};

export default Events;
