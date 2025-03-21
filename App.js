import { StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import "./global.css";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FuelDelivery from './Components/Service/FuelDelivery';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Components/Home';
import Beforlogin from './Components/Beforlogin'
import Login from './Components/Login'
import Register from './Components/Register'
import Emailuser from './Components/Emailuser'
import Emailverification from './Components/Emailverification'
import Forgetpassword from './Components/Forgetpassword'
import Congratulation from './Components/Congratulation';
import StationDetails from './Components/Service/StationDetails';
import CartPage from './Components/Service/CartPage';
import Electronicservices from './Components/Service/ElectronicServices/Electronicservices';
import ProfilePage from './Components/Profile/ProfilePage';
// import Listallapi from './Components/Api/Listallapi';
// import EditProfile from './Components/Profile/EditProfile';
import Loding from './Components/loding/Loding';
import FuelStationList from './Components/Service/FuelStationList';
import Acrepair from './Components/Service/ElectronicServices/Acrepair';
import UserForm from './Components/Service/UserForm';
import BookingScreen from './Components/Service/ElectronicServices/BookingScreen';
import ServiceElectronicsList from './Components/Service/ElectronicServices/ServiceElectronicsList';
// import AsyncStorageex from './Components/AsyncStorageex';
import TVservice from './Components/Service/ElectronicServices/TVservice';
// import MainApp from './Components/redux/MainApp';
// import Userlist from './Components/redux/Userlist';
import SummaryPage from './Components/Service/ElectronicServices/SummaryPage';
// import UserSql from './Components/Sqlite/UserSql';
// import HomeSql from './Components/Sqlite/HomeSql';
// import Location from './Components/Location';
import WashingMachine from './Components/Service/ElectronicServices/WashingMachine';
import Computer from './Components/Service/ElectronicServices/Computer';
import Refrigerator from './Components/Service/ElectronicServices/Refrigerator';
import OtherDevice from './Components/Service/ElectronicServices/OtherDevice';
import MechanicServicesHome from './Components/Service/MechanicServices/MechanicServicesHome';
import SplashScreenComponent from "./Components/SplashScreen";

const App = () => {
  const Stack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = useState(true);

  // // Prevent the splash screen from auto-hiding
  // SplashScreen.preventAutoHideAsync();


  // useEffect(() => {
  //   async function prepareApp() {
  //     // Simulate loading (e.g., fetching user data, assets, etc.)
  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     // Hide the splash screen
  //     await SplashScreen.hideAsync();
  //   }

  //   prepareApp();
  // }, []);

  return isLoading ? (
    <SplashScreenComponent onAnimationEnd={() => setIsLoading(false)} />
  ) : (
    <NavigationContainer >
      <StatusBar
        backgroundColor="black"  // Sets the background color of the status bar
        barStyle="light-content"  // Sets the status bar text and icon color to light
      />
      <Stack.Navigator screenOptions={{
        headerTransparent: true, // Makes the header background transparent
        headerTitle: '', // Hides the title
        headerBackTitleVisible: false, // Hides the back button text label
        headerTintColor: 'black', // Sets the back button arrow color
        // headerStyle: {
        //   backgroundColor: 'black', // Sets the header background to black
        // },
      }}>

        <Stack.Screen name='Beforlogin' component={Beforlogin} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Emailuser' component={Emailuser} />
        <Stack.Screen name='Emailverification' component={Emailverification} />
        {/* <Stack.Screen name='Forgetpassword' component={Forgetpassword} /> */}
        {/* <Stack.Screen name='Congratulation' component={Congratulation} /> */}
        {/* <Stack.Screen name='Loding' component={Loding} /> */}

        {/* <Stack.Screen name='EditProfile' component={EditProfile} /> */}

        {/* test */}
        {/* <Stack.Screen name='Listallapi' component={Listallapi} /> */}
        {/* <Stack.Screen name='AsyncStorageex' component={AsyncStorageex} /> */}




        {/* service  */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Electronicservices' component={Electronicservices} />
        <Stack.Screen name='TVservice' component={TVservice} />
        <Stack.Screen name='BookingScreen' component={BookingScreen} />
        <Stack.Screen name='ServiceElectronicsList' component={ServiceElectronicsList} />
        <Stack.Screen name='Acrepair' component={Acrepair} />
        <Stack.Screen name='WashingMachine' component={WashingMachine} />
        <Stack.Screen name='Computer' component={Computer} />
        <Stack.Screen name='Refrigerator' component={Refrigerator} />
        <Stack.Screen name='OtherDevice' component={OtherDevice} />
        <Stack.Screen name='SummaryPage' component={SummaryPage} />
        {/* <Stack.Screen name='ProfilePage' component={ProfilePage} /> */}

        {/* fule */}
        <Stack.Screen name="FuelDelivery" component={FuelDelivery} />
        <Stack.Screen name="FuelStationList" component={FuelStationList} />
        <Stack.Screen name="StationDetails" component={StationDetails} />
        <Stack.Screen name='UserForm' component={UserForm} />
        <Stack.Screen name='CartPage' component={CartPage} />

        {/* <Stack.Screen name='Location' component={Location} /> */}

        {/* redux */}
        {/* <Stack.Screen name='MainApp' component={MainApp} /> */}
        {/* <Stack.Screen name='Userlist' component={Userlist} /> */}


        {/* MechanicServices */}
        <Stack.Screen name='MechanicServicesHome' component={MechanicServicesHome} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App