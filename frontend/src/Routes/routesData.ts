import React from "react";
import { RoutePaths } from "./RoutePaths";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import StackPage from "../pages/StackPage";
import GeneralReports from "../pages/GeneralReports";


export interface RouteItem {
  path: string;
  element: React.ComponentType;
}



//route for non-logged in users
export const publicRoutes: RouteItem[] = [
  { path: RoutePaths.LOGIN, element: LoginPage },
  { path: RoutePaths.REGISTER, element: RegistrationPage },
  { path: RoutePaths.HOME, element: HomePage },
  { path: RoutePaths.FORGOT_PASSWORD, element: ForgotPasswordPage },
];

export const userRoutes: RouteItem[] = [
  { path: RoutePaths.STACK, element: StackPage },
];

export const adminRoutes: RouteItem[] = [
  { path: RoutePaths.GENERAL_REPORTS, element: GeneralReports },

];
