import {FC,ReactNode,useState} from 'react';
import {NavLink as RouterLink} from 'react-router-dom'
import React from 'react';
import  PropTypes  from 'prop-types'

import {Button,ListItem,styled} from '@mui/material';


interface SidebarMenuItemProps {
    link?: string;
    name: string;
    id: string;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
    link,
    name,
    id
}) => {
    return(
        <ListItem component='div' key={name}>
            <Button
                id={id}
                disableRipple
                component={RouterLink}
                to={link ? link: ''}
                style={{fontFamily: '"Roboto'}}
            >{name}
            </Button>
        </ListItem>
    );
};

SidebarMenuItem.propTypes = {
    link: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default SidebarMenuItem;