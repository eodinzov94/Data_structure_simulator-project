import React from "react";
import LoginPage from "../pages/LoginPage";

export interface RouteItem{
    path: string;
    element: React.ComponentType;
}

export enum RoutePaths{
    LOGIN = '/login',
}

//route for non-logged in users
export const publicRoutes: RouteItem[] = [
    {path:RoutePaths.LOGIN, element:LoginPage},
]

export const userRoutes: RouteItem[] = [
]

export const adminRoutes: RouteItem[] = [
]
