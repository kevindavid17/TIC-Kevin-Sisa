//import logo from './logo.svg';
import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import SensorsView from './Views/SensorsView';
import ContactosView from './Views/ContactosView';
import GraphicsView from './Views/GraphicsView';
import {AuthProvider} from './context/authContext';
import { ProtectedRoute } from './Route/ProtectedRoute';

import './App.css';



function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
  
        <Route exact path="/mediciones" element={
          <ProtectedRoute>
            <SensorsView/>
          </ProtectedRoute>
        }/>

        <Route path="/mediciones/graficas" element={
          <ProtectedRoute>
            <GraphicsView/>
          </ProtectedRoute>
        }/>
        <Route path="/contactos" element={
          <ProtectedRoute>
            <ContactosView/>
          </ProtectedRoute>
        }/>
        <Route path="*" element={
          <ProtectedRoute>
            <Navigate to ="/mediciones"/>
          </ProtectedRoute>
        }/>
        
        <Route path="/login" element={<LoginView/>}/>
        <Route path="/registro" element={<RegisterView/>}/>
        <Route path="*" element={<Navigate to ="/login"/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
   
    

  );
}

export default App;
