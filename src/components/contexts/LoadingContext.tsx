import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (loading: boolean) => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);