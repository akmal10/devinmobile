import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  comparisonEnabled: boolean;
  setComparisonEnabled: (enabled: boolean) => void;
  selectedComparison: string;
  setSelectedComparison: (comparison: string) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

interface DateProviderProps {
  children: ReactNode;
}

export function DateProvider({ children }: DateProviderProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');
  const [comparisonEnabled, setComparisonEnabled] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState('None');

  return (
    <DateContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,
        comparisonEnabled,
        setComparisonEnabled,
        selectedComparison,
        setSelectedComparison,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
}
