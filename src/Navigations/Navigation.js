import React from 'react';
import {useSelector} from 'react-redux'; // Import the useSelector hook
import BottomTabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import OtpScreen from '../Screens/OtpScreen';
import EditGender from '../Screens/Profile/EditGender';
import EditDateOfBirth from '../Screens/Profile/EditDateOfBirth';
import EditEmail from '../Screens/Profile/EditEmail';

import EditName from '../Screens/Profile/EditName';
import UserProfile from '../Screens/Profile/UserProfile';
import DrawerNavigation from './DrawerNavigation';
import Bill from '../Screens/Bill';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  // Access the UID value from the Redux store using useSelector

  const loggedIn = useSelector(state => state.counter.loggedIn);
  const phone = useSelector(state => state.counter.phone);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
            />

            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="Bill" component={Bill} />
            <Stack.Screen name="UserProfile" component={UserProfile} />

            <Stack.Screen name="EditDateOfBirth" component={EditDateOfBirth} />
            <Stack.Screen name="EditEmail" component={EditEmail} />

            <Stack.Screen name="EditGender" component={EditGender} />
            <Stack.Screen name="EditName" component={EditName} />
           
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
