import React, { useState, useEffect } from 'react';
import UserBox from '../../components/UserBox/UserBox';
import { User } from '../../models/user/user';
import { Grid, Box, Snackbar, IconButton } from '@mui/material';
import { MongoId } from '../../types/types';
import axios from 'axios';

const SERVER_URL = 'http://34.175.235.94';

const getUsersReported = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/reported`);
    const data = response.data.users;
    // Suponiendo que la respuesta del servidor es un array de usuarios reportados en formato JSON
    const reportedUsers: User[] = data;
    return reportedUsers;
  } catch (error) {
    console.error('Error al obtener los usuarios reportados:', error);
    return [];
  }
};

const Users: React.FC = () => {
  const [reportedUsers, setReportedUsers] = useState<User[]>([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false); // Estado para controlar la visibilidad del mensaje

  useEffect(() => {
    const fetchReportedUsers = async () => {
      const users = await getUsersReported();
      setReportedUsers(users);
    };

    fetchReportedUsers();
  }, []);

  const deleteUser = async (username: string, id: MongoId) => {
    try {
      // Eliminar la tarjeta del usuario del array reportedUsers
      setReportedUsers(prevUsers => prevUsers.filter(user => user.username !== username));

      // Enviar solicitud de eliminación al servidor
      await axios.delete(`${SERVER_URL}/users/deleteUser`, { data: { id: id } });

      console.log('Usuario eliminado correctamente');
      setShowDeleteMessage(true); // Mostrar el mensaje después de eliminar el usuario
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleCloseDeleteMessage = () => {
    setShowDeleteMessage(false); // Hide the message
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (showDeleteMessage) {
      timer = setTimeout(handleCloseDeleteMessage, 2000); // Set the timer to hide the message after 2 seconds
    }

    return () => {
      if (timer) {
        clearTimeout(timer); // Clear the timer if the component unmounts or the state changes
      }
    };
  }, [showDeleteMessage]);

  return (
    <Grid container spacing={2} style={{ marginTop: 0 }}>
      {reportedUsers.map((user, index) => (
        <Grid item xs={12} sm={3} md={2} lg={3} key={index}>
          <Box width="100%" sx={{ marginLeft: '250px', transform: 'scale(0.75)' }}>
            <UserBox user={user} onDelete={deleteUser} />
          </Box>
        </Grid>
      ))}
     <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={showDeleteMessage}
        autoHideDuration={null}
        onClose={handleCloseDeleteMessage}
        message="Usuario eliminado correctamente"
      />
      </Grid>
  );
};

export default Users;
