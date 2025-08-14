import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import { LocationProvider } from './src/contexts/LocationContext';
import { DateProvider } from './src/contexts/DateContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <DateProvider>
          <NavigationContainer>
            <TabNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </DateProvider>
      </LocationProvider>
    </SafeAreaProvider>
  );
}
