export enum RoutePaths{
    HOME = "/",

    //Auth
    LOGIN = '/login',
    REGISTER = "/register",
    FORGOT_PASSWORD ='/forgotPassword',
    REGISTER_LECTURER="/register-lecturer",
    TWO_FA = '/2fa',
    VERIFY_EMAIL = '/verify-email/:token',

    //reports
    REPORTS = "/reports",
    GENERAL_REPORTS = "/reports/general",
    ALGORITHMS_REPORTS = "/reports/algorithms",

    //Animations
    STACK = "/stack",
    QUEUE = "/queue",
    QUICK_SORT = "/quicksort",
    INSERTION_SORT = "/insertionsort",


    //feedbacks
    ADD_FEEDBACK = "/add-feedback",
    ALL_FEEDBACKS = '/all-feedbacks'
}

export default RoutePaths;