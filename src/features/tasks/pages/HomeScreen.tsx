import React from 'react';
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';

const HomeScreen = () => {
  useAuthRedirect(true);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default HomeScreen;
