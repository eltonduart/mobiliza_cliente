import React from 'react';

import { AuthProvider } from './AuthContext';
import { SnackbarProvider } from 'notistack';

const RootProvider: React.FC = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    <AuthProvider>{children}</AuthProvider>
  </SnackbarProvider>
);

export default RootProvider;
