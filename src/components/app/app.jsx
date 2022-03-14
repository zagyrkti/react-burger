import React from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ConstructorPage from "../constructor-page/constructor-page";

function App() {

  return (
      <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path='/' element={<ConstructorPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
