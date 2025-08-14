import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface LocationContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('New York');

  const contextValue = useMemo(
    () => ({ selectedLocation, setSelectedLocation }),
    [selectedLocation]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
