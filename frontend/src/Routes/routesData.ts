import React from 'react'
import { RoutePaths } from './RoutePaths'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegistrationPage from '../pages/RegistrationPage'
import StackPage from '../pages/StackPage'
import GeneralReportsPage from '../pages/GeneralReportsPage'
import ReportsPage from '../pages/ReportsPage'
import QueuePage from '../pages/QueuePage'
import AlgorithmsReportPage from '../pages/AlgorithmsReportsPage'
import RegisterLecturerPage from '../pages/RegisterLecturerPage'
import FeedbacksPage from '../pages/FeedbacksPage'
import AddFeedbackPage from '../pages/AddFeedBackPage'
import TwoFactorAuthPage from '../pages/TwoFactorAuthPage'

import QuickSortPage  from '../pages/sorts/QuickSortPage'
import EmailVerificationPage from '../pages/EmailVerificationPage'

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
];

export const lecturerRoutes: RouteItem[] = [
  { path: RoutePaths.REPORTS, element: ReportsPage },
  { path: RoutePaths.REGISTER_LECTURER, element: RegisterLecturerPage },
  { path: RoutePaths.GENERAL_REPORTS, element: GeneralReportsPage },
  { path: RoutePaths.ALGORITHMS_REPORTS, element: AlgorithmsReportPage },
  { path: RoutePaths.ALL_FEEDBACKS, element: FeedbacksPage },

];
