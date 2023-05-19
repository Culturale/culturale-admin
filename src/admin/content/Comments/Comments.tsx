import React, { useState, useEffect } from 'react';
import CommentBox from '../../components/CommentBox/CommentBox';
import { Comment } from '../../models/Comment/comment';
import { Grid, Box } from '@mui/material';
import axios from 'axios';
import { MongoId } from '../../types/types';



const SERVER_URL = 'http://localhost:8082';

const getCommentsReported = async (): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${SERVER_URL}/events/getReportedReviews`);
    const data = response.data.events;
    // Suponiendo que la respuesta del servidor es un array de comentarios reportados en formato JSON
    const reportedComments: Comment[] = data;
    return reportedComments;
  } catch (error) {
    console.error('Error al obtener los comentarios reportados:', error);
    return [];
  }
}



const Comments: React.FC = () => {
  const [reportedComments, setReportedComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchReportedComments = async () => {
      const comments = await getCommentsReported();
      setReportedComments(comments);
    };

    fetchReportedComments();
  }, []);

  const deleteComment = async (id: MongoId) => {
    try {

      setReportedComments(prevComments => prevComments.filter(comment => comment._id !== id));
      
      // Enviar solicitud de eliminación al servidor
      await axios.delete(`${SERVER_URL}/events/deleteReview`, { data: { id: id } });
      
      console.log('Review eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la review:', error);
    }
  };


  

  return (
    <Grid container spacing={2} style={{ marginTop: 0 }}>
        {reportedComments.map((comment, index) => (
            <Grid item xs={12} sm={3} md={2} lg={3} key={index}>
            <Box width="100%" sx={{ marginLeft: '250px', transform: 'scale(0.75)' }}>
                <CommentBox comment={comment} onDelete={deleteComment} />
            </Box>
            </Grid>
        ))}
    </Grid>
  );
};

export default Comments;
