import React from 'react';
import { Comment } from '../../models/Comment/comment';
import { Typography, Card, CardContent, Box, Rating, Button } from '@mui/material';
import { styled } from '@mui/system';
import { MongoId } from '../../types/types';

interface CommentProps {
  comment: Comment;
  onDelete: (id: MongoId) => void;
}

const DeleteButton = styled(Button)({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: '#f44336',
    color: '#fff',
  });

const CommentBox: React.FC<CommentProps> = ({ comment, onDelete }) => {

    const handleDeleteComment = () =>{
        if (comment._id) {
            onDelete(comment._id);
        }
    }
    
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Autor: {comment.authorId}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body1" sx={{ marginRight: '8px' }}>
            Puntuación:
          </Typography>
          <Rating value={comment.puntuation} precision={0.5} readOnly />
        </Box>
        {comment.comment && (
          <Typography variant="body1" gutterBottom>
            Comentario: {comment.comment}
          </Typography>
        )}
        <Typography variant="body1" gutterBottom>
          Reportes: {comment.report}
        </Typography>
        < DeleteButton variant="contained" onClick={handleDeleteComment}>
          Eliminar Comentario
        </DeleteButton>
      </CardContent>
    </Card>
  );
};

export default CommentBox;
