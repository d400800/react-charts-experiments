import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppLayout from "./AppLayout/AppLayout";
import AppRouter from "./AppRouter";

function App() {
  return (
    <>
      <CssBaseline />

      <AppLayout>
        <AppRouter />
      </AppLayout>
    </>
  );
}

export default App;
