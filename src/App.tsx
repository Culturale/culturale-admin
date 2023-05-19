import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import useAuth from './admin/hooks/useAuth';
import { useRoutes } from 'react-router-dom';
import router from './admin/routes';
import store from './admin/store';



export default function App() {
  const content = useRoutes(router);
  const auth = useAuth();
  return (
    <Provider store={store}>
      {auth.isInitialized ? content: null}
    </Provider>
  );
}
