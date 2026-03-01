import React from 'react';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
