import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ListView from '../screens/ListView';

const stackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <stackRoutes.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#3D6DCC',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 24
                },
                contentStyle: { backgroundColor: 'transparent' }
            }}>
            <stackRoutes.Screen name="Home" component={Home} options={{ title: 'Listas' }} />
            <stackRoutes.Screen name="ListView" component={ListView} options={{ title: 'Tarefas' }} />
        </stackRoutes.Navigator>
    )
}

export default AppRoutes
