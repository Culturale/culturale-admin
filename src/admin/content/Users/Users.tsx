import React, { useState, useEffect } from 'react';
import UserBox from '../../components/UserBox/UserBox';
import { User } from '../../models/user/user';
import { Grid, Box } from '@mui/material';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8082';

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

  useEffect(() => {
    const fetchReportedUsers = async () => {
      const users = await getUsersReported();
      setReportedUsers(users);
    };

    fetchReportedUsers();
  }, []);

  const deleteUser = async (username: string) => {
    try {
      // Eliminar la tarjeta del usuario del array reportedUsers
      setReportedUsers(prevUsers => prevUsers.filter(user => user.username !== username));
      
      // Enviar solicitud de eliminación al servidor
      await axios.delete(`${SERVER_URL}/users/deleteUser`, { data: { id: username } });
      
      console.log('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };
  

  return (
    <Grid container spacing={2} style={{ marginTop: 0 }}>
      {reportedUsers.map((user, index) => (
        <Grid item xs={12} sm={3} md={2} lg={3} key={index}>
          <Box width="100%" sx={{ marginLeft: '250px', transform: 'scale(0.75)' }}>
            <UserBox user={user} onDelete={deleteUser} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;
