import { Box, List, styled } from '@mui/material';
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import SidebarMenuItem from './item';

import { RootState, useDispatch, useSelector } from '../../../store';
import { useEffect } from 'react';
import { MenuItem, setMenu } from '../../../slices/menuItems';


const renderSidebarMenuItems = ({ items, path }: { items: MenuItem[]; path: string }): JSX.Element => (
  <>
    {items.map((item,index) => (
      <SidebarMenuItem
        key={index}
        id={item.id}
        name={item.name}
        link={item.link}
      />
    ))}
  </>
);

function SidebarMenu() {
  const location = useLocation();
  const dispatch = useDispatch();
  const menuState = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(setMenu());
  }, []);

  return (
    <>
      {menuState.menu.map((section,index) => (
        <List component="div" key={index}>
          {renderSidebarMenuItems({
            items: section.items,
            path: location.pathname,
          })}
        </List>
      ))}
    </>
  );
}

export default SidebarMenu;
