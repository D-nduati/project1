import React from 'react';
import AllRoutes from './Routes/AllRoutes'
import { UserProvider } from './userContext';
import './App.css';


function App() {
  return (
    <>
      <UserProvider>
        <AllRoutes />
      </UserProvider>
    </>
  );
}

export default App;
