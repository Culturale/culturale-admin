import { Navigate, Outlet } from 'react-router-dom';
import { Main } from '../layouts/MainLayout';
import Users from '../content/Users/Users';
import Events from '../content/Events/Events';
import Comments from '../content/Comments/Comments';
import { Box } from '@mui/material';
import Authenticated from '../components/Authenticated';
import React from 'react';

const router = [
    {
        path: '/',
        element: (
            <Authenticated>
                <Outlet />
                <Main />
                
            </Authenticated>
        ),
        children: [
            {
                path: '/',
                element: <Navigate to="users" replace />
            },
            {
                path: 'users',
                element: <Users />
                
            },
            {
                path: 'comments',
                element: <Comments />
            },
            {
                path: 'events',
                element: <Events />
            }


        ]
    }
];

export default router;