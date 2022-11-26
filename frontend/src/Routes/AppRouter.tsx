import { Route, Switch } from "react-router-dom";
import { publicRoutes, userRoutes, adminRoutes } from "./routesData";

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route path={route.path} exact key={route.path}>
          {<route.element />}
        </Route>
      ))}
    </Switch>
  );
};

export default AppRouter;
