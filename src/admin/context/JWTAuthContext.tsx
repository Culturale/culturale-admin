import { FC, ReactNode, createContext, useEffect, useReducer } from 'react';
import React from 'react';
import axios from 'axios';
import  PropTypes  from 'prop-types';
import { decode, verify, JWT_SECRET } from '../utils/jwt';
import { User } from '../models/user/user';


const SERVER_URL = "http://localhost:8082";

interface AuthState {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: User | null;
}

interface AuthContextValue extends AuthState {
    method: 'JWT';
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

type InitializeAction = {
    type: 'INITIALIZE';
    payload: {
        isAuthenticated: boolean;
        user: User | null;
    }
}

type LoginAction = {
    type: 'LOGIN';
    payload: {
        user: User;
    }
}

type LogoutAction = {
    type: 'LOGOUT';
}

type Action = InitializeAction | LoginAction | LogoutAction;

const initialAuthState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,

}

const setSession= (accessToken: string | null): void => {
    if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }else {
        delete axios.defaults.headers.common.Authorization;
    }
};

const handlers: Record<string, (state:AuthState, action:Action) => AuthState> = {
    INITIALIZE: (state: AuthState, action: Action): AuthState => {
        const { isAuthenticated, user } = (action as InitializeAction).payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state: AuthState, action: Action): AuthState => {
        const { user } = (action as LoginAction).payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state: AuthState): AuthState => ({
        ...state,
        isAuthenticated: false,
        user: null,

    }),
};

const reducer = (state: AuthState, action: Action): AuthState => handlers[action.type] ? handlers[action.type](state,action) : state;

const AuthContext = createContext<AuthContextValue> ({
    ...initialAuthState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()

});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    useEffect(() => {
        const initialize = async() : Promise<void> => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken && verify(accessToken, JWT_SECRET)) {
                    setSession(accessToken);
                    const userId = decode(accessToken)['id'];
                    const response = await axios.get<any>(`${SERVER_URL}/username/${userId}`);
                

                    const user : User = response.data.data;
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user,
                        }
                    });
                }else {
                    dispatch ({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        }
                    });
                }

            }catch (err) {
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    }
                });
            }

            
        };
        initialize().then();
    },  []);

    const login = async (username:string, password:string): Promise<any> => {
        console.log('entra al login');
        const response = await axios.post<{token: string;}>(`${SERVER_URL}/users/login`,
        {
            username,
            password
        });
        if (response.data.token) {
            const userId = decode(response.data.token)['id'];
            const userResponse = await axios.get<any>(`${SERVER_URL}/username/${userId}`);
            const user: User = userResponse.data.data;
            if (user.usertype == 'ADMIN') {
                setSession(response.data.token);
            }
            dispatch({
                type: 'LOGIN',
                payload: {
                    user
                }
            });
        }
        return response;
    };

    const logout = async(): Promise<void> => {
        dispatch({type: 'LOGOUT'});
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );


};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;


