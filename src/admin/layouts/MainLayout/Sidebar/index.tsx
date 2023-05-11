import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemText } from '@mui/material';



const Sidebar = () => {
    return (
        <Drawer variant="permanent" anchor="left">
          <List>
            <ListItem  component={Link} to="/usuarios">
              <ListItemText primary="Usuarios" />
            </ListItem>
            <ListItem  component={Link} to="/comentarios">
              <ListItemText primary="Comentarios" />
            </ListItem>
            <ListItem  component={Link} to="/gestion-eventos">
              <ListItemText primary="Gestión eventos" />
            </ListItem>
          </List>
        </Drawer>
      );
};

const Usuarios = () => <h2>Usuarios</h2>;
const Comentarios = () => <h2>Comentarios</h2>;
const GestionEventos = () => <h2>Gestión eventos</h2>;

export const MenuWrapper = () => {
    return (
        <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />

        <div style={{ marginLeft: '240px' }}>
          <Routes>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/comentarios" element={<Comentarios />} />
            <Route path="/gestion-eventos" element={<GestionEventos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );

}


