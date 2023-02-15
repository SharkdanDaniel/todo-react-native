import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
  // return (
  //   <SafeAreaProvider>
  //     <Home />
  //   </SafeAreaProvider>
  // )
}
