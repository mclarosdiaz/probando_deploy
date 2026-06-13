//import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Layout from './features/layout/Layout.jsx';
import Home from './features/home/Home.jsx';
import HistorialTurnosPage from './features/historialTurnos/HistorialTurnosPage.jsx';
import BusquedaDeTurnosPage from './features/busquedaTurnos/BusquedaTurnosPage.jsx';
import { TurnoCartProvider } from './context/carritoTurnosContext.jsx';
import PreseleccionTurnosPage from './features/preseleccionTurnos/PreseleccionTurnosPage.jsx'

function App() {
  return (


    //TODO Pantallas de Disponibilidad de Médicos
    //TODO Pantallas de Gestión de Servicios
    //TODO Terminar pantallas de Búsqueda de Turnos
    //TODO Pantallas de Visualización de Notificaciones
    //TODO Iniciar Sesión Card
    <TurnoCartProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/historialDeTurnos" element={<HistorialTurnosPage />} />
          <Route path="/busquedaDeTurnos" element={<BusquedaDeTurnosPage />} />
          <Route path="/turnos/preseleccion" element={<PreseleccionTurnosPage />} />
        </Route>
      </Routes>

    </TurnoCartProvider>
  );
}

export default App;
