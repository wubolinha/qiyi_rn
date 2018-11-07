import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';
import LoginPage from '../pages/LoginPage'
import MainPage from "../pages/MainPage";


export  const App = StackNavigator({
    Login: { screen: LoginPage },
    Main:{ screen:  MainPage},
});

