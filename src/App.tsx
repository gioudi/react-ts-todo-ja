import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts';
import LandingScreen from './features/auth/pages/LadingScreen';
import LoginScreen from './features/auth/pages/LoginScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>} >
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
