import { FC, ReactNode, useState } from 'react';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import LoginBasic from '../../content/Auth/Login';
import { request } from 'http';

interface AuthenticatedProps {
    children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = (props: {children:any}) => {
    const {children} = props;
    const auth = useAuth();
    const location = useLocation();
    const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

    if (!auth.isAuthenticated) {
        if (location.pathname !== requestedLocation) {
            setRequestedLocation(location.pathname);
        }
        return <LoginBasic />;
    }

    if (requestedLocation && location.pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;

};

Authenticated.propTypes = {
    children: PropTypes.node
};

export default Authenticated;