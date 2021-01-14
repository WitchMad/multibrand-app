import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';
import Main from '~/pages/Main';

import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

import {navigationRef} from '~/services/navigation';

function Routes() {
  const {signedIn} = useSelector((state) => state.auth);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={signedIn ? 'Main' : 'SignIn'}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
