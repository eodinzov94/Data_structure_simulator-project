import { Route, Switch } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectAuthentication } from "../store/reducers/auth-reducer";
import { publicRoutes, userRoutes, adminRoutes } from "./routesData";

const AppRouter = () => {
  const authSlice = useAppSelector(selectAuthentication);
  
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route path={route.path} exact key={route.path}>
          {<route.element />}
        </Route>
      ))}
      {authSlice.isLogin && userRoutes.map((route) => (
        <Route path={route.path} exact key={route.path}>
          {<route.element />}
        </Route>
      ))}

{/* NEED TO ADD IS ADMIN CHECK! */}
  {adminRoutes.map((route) => (
        <Route path={route.path} exact key={route.path}>
          {<route.element />}
        </Route>
      ))}
    </Switch>
  );
};

export default AppRouter;
