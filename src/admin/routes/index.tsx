import { Navigate } from 'react-router-dom';
import Authenticated from '../components/Authenticated';
import { Main } from '../layouts/MainLayout';
import React from 'react';

const router = [
    {
        path: '/',
        element: (
            <Main />
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