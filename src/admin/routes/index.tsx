import { Navigate } from 'react-router-dom';
import Authenticated from '../components/Authenticated';
import { Main } from '../layouts/MainLayout';
import React from 'react';

const router = [
    {
        path: '/',
        element: (
            <Authenticated>
                <Main />
            </Authenticated>
        )
    }
];

export default router;