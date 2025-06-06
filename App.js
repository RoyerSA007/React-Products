import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationProducts from './src/Navigation/NavigationProducts';
import { CarritoProvider } from './src/context/carritoContext'; // Asegúrate de que esta ruta sea correcta

export default function App() {
  return (
    <CarritoProvider>
      <NavigationContainer>
        <NavigationProducts />
      </NavigationContainer>
    </CarritoProvider>
  );
}
