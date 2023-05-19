import {createSlice} from '@reduxjs/toolkit';
import type { AppThunk } from '../store';

export interface MenuItem {
    link?: string;
    name: string;
    id: string;
}

export interface MenuItems {
    items: MenuItem[];
    heading: string;
}

interface menuState {
    menu: MenuItems[];
    loading: boolean;
}


const initialState: menuState = {
    menu: [],
    loading: true

};

const menu = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {
        setMenu: (state: menuState, action) => {
            state.menu =[
                {
                    heading: '',
                    items: [
                        {
                            id: 'btn-users',
                            name: 'Usuarios',
                            link: '/users',
                        },
                        {
                            id: 'btn-comments',
                            name: 'Comentarios',
                            link: '/comments',
                        },
                        {
                            id: 'btn-events',
                            name: 'Gestion Eventos',
                            link: '/events',
                        }
                    ]
                }
            ]
        }
    },

});

export const menuReducer = menu.reducer;

export const setMenu = 
    (): AppThunk => 
        async (dispatch): Promise<void> => {
            dispatch(menu.actions.setMenu(null));
        };

export default menu;
