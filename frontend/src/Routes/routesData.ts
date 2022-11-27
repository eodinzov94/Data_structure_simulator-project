import React from "react";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

export interface RouteItem{
    path: string;
    element: React.ComponentType;
}

export enum RoutePaths{
    LOGIN = '/login',
    Register = "/register",
    Home = "/"
}

//route for non-logged in users
export const publicRoutes: RouteItem[] = [
    {path:RoutePaths.LOGIN, element:LoginPage},
    {path:RoutePaths.Register, element:RegistrationPage},
    {path:RoutePaths.Home, element:HomePage}

]

export const userRoutes: RouteItem[] = [

]

export const adminRoutes: RouteItem[] = [

]
