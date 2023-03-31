import React from "react";
import { RoutePaths } from "./RoutePaths";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import StackPage from "../pages/Animations/DataStructure/StackPage";
import GeneralReportsPage from "../pages/general/GeneralReportsPage";
import ReportsPage from "../pages/general/ReportsPage";
import QueuePage from "../pages/Animations/DataStructure/QueuePage";
import AlgorithmsReportPage from "../pages/general/AlgorithmsReportsPage";
import RegisterLecturerPage from "../pages/RegisterLecturerPage";
import FeedbacksPage from "../pages/general/FeedbacksPage";
import AddFeedbackPage from "../pages/general/AddFeedBackPage";
import TwoFactorAuthPage from "../pages/TwoFactorAuthPage";

import QuickSortPage from "../pages/Animations/sorts/QuickSortPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import InsertionSortPage from "../pages/Animations/sorts/InsertionSortPage";

export interface RouteItem {
  path: string;
  element: React.ComponentType;
}

//route for non-logged in users
export const publicRoutes: RouteItem[] = [
  { path: RoutePaths.HOME, element: HomePage },
  { path: RoutePaths.LOGIN, element: LoginPage },
  { path: RoutePaths.REGISTER, element: RegistrationPage },
  { path: RoutePaths.FORGOT_PASSWORD, element: ForgotPasswordPage },
  { path: RoutePaths.TWO_FA, element: TwoFactorAuthPage },
  { path: RoutePaths.VERIFY_EMAIL, element: EmailVerificationPage },
];

export const userRoutes: RouteItem[] = [
  { path: RoutePaths.HOME, element: HomePage },
  { path: RoutePaths.ADD_FEEDBACK, element: AddFeedbackPage },
  //Animations
  { path: RoutePaths.STACK, element: StackPage },
  { path: RoutePaths.QUEUE, element: QueuePage },
  { path: RoutePaths.QUICK_SORT, element: QuickSortPage },
  { path: RoutePaths.INSERTION_SORT, element: InsertionSortPage },
];

export const lecturerRoutes: RouteItem[] = [
  { path: RoutePaths.REPORTS, element: ReportsPage },
  { path: RoutePaths.REGISTER_LECTURER, element: RegisterLecturerPage },
  { path: RoutePaths.GENERAL_REPORTS, element: GeneralReportsPage },
  { path: RoutePaths.ALGORITHMS_REPORTS, element: AlgorithmsReportPage },
  { path: RoutePaths.ALL_FEEDBACKS, element: FeedbacksPage },
];
