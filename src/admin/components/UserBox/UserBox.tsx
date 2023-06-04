import React from 'react';
import { User } from '../../models/user/user';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/system';
import { MongoId } from '../../types/types';

interface UserProps {
    user: User
    onDelete: (username: string, _id: MongoId) => void;
};

const StyledCard = styled(Card)({
  backgroundColor: '#f5f5f5',
});

const StyledTypography = styled(Typography)({
  fontFamily: 'Arial, sans-serif',
  color: '#333',
});

const DeleteButton = styled(Button)({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: '#f44336',
    color: '#fff',
  });
  
  const UserBox: React.FC<UserProps> = ({ user, onDelete }) => {
    const handleDeleteUser = () => {
      if (user._id) {
        onDelete(user.username, user._id)
      }
    };

  
    return (
      <StyledCard variant="outlined">
        <CardContent>
          <StyledTypography variant="h6" gutterBottom>
            {user.username}
          </StyledTypography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${user.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Email: ${user.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Usertype: ${user.usertype}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Report: ${user.report}`} />
            </ListItem>
          </List>
        </CardContent>
        <DeleteButton variant="contained" onClick={handleDeleteUser}>
          Eliminar usuario
        </DeleteButton>
      </StyledCard>
  );
};

export default UserBox;
