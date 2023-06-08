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

import HeapPage from "../pages/Animations/DataStructure/HeapPage";
import QuickSortPage from "../pages/Animations/sorts/QuickSortPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import InsertionSortPage from "../pages/Animations/sorts/InsertionSortPage";
import CountingSortPage from "../pages/Animations/sorts/CountingSortPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import MergeSortPage from "../pages/Animations/sorts/MergeSortPage";
import { BucketSortPage } from "../pages/Animations/sorts/BucketSortPage";

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
  { path: RoutePaths.POST_FEEDBACK, element: AddFeedbackPage },
];

export const userRoutes: RouteItem[] = [
  { path: RoutePaths.HOME, element: HomePage },
  { path: RoutePaths.POST_FEEDBACK, element: AddFeedbackPage },
  { path: RoutePaths.PROFILE, element: ProfilePage },
  { path: RoutePaths.EDIT_PROFILE, element: EditProfilePage },

  //Animations
  { path: RoutePaths.STACK, element: StackPage },
  { path: RoutePaths.QUEUE, element: QueuePage },
  { path: RoutePaths.HEAP, element: HeapPage },
  { path: RoutePaths.QUICK_SORT, element: QuickSortPage },
  { path: RoutePaths.INSERTION_SORT, element: InsertionSortPage },
  { path: RoutePaths.COUNTING_SORT, element: CountingSortPage },
  { path: RoutePaths.MERGE_SORT, element: MergeSortPage },
  { path: RoutePaths.BUCKET_SORT, element: BucketSortPage },
];

export const lecturerRoutes: RouteItem[] = [
  { path: RoutePaths.REPORTS, element: ReportsPage },
  { path: RoutePaths.REGISTER_LECTURER, element: RegisterLecturerPage },
  { path: RoutePaths.GENERAL_REPORTS, element: GeneralReportsPage },
  { path: RoutePaths.ALGORITHMS_REPORTS, element: AlgorithmsReportPage },
  { path: RoutePaths.ALL_FEEDBACKS, element: FeedbacksPage },
];
