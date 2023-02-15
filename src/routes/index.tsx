import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './stack.routes';
import { StatusBar } from 'react-native';

function Routes() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="default" backgroundColor="#3D6DCC" />
            <AppRoutes />
        </NavigationContainer>
    )
}

export default Routes
