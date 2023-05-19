import { Box, styled } from '@mui/material';
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import SidebarMenuItem from './item';

import { RootState, useDispatch, useSelector } from '../../../store';
import { useEffect } from 'react';
import { MenuItem, setMenu } from '../../../slices/menuItems';

const StyledBox = styled(Box)({
  width: '240px',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#f0f0f0', // Ajusta el color de fondo según tus necesidades
  overflowY: 'auto', // Añade scroll vertical si el contenido excede el alto
});

const renderSidebarMenuItems = ({ items, path }: { items: MenuItem[]; path: string }): JSX.Element => (
  <>
    {items.map((item, index) => (
      <SidebarMenuItem key={index} id={item.id} name={item.name} link={item.link} />
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
      {menuState.menu.map((section, index) => (
        <StyledBox component="div" key={index}>
          {renderSidebarMenuItems({
            items: section.items,
            path: location.pathname,
          })}
        </StyledBox>
      ))}
    </>
  );
}

export default SidebarMenu;
