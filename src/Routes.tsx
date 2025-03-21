import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
} from "react-router-dom";
import { Layout } from "./components";
import { Error } from "./pages/Error";
import { ROUTES_CONFIG, RouteKey } from "./config/api-routes";


const Routes = () => (
  <Router>
    <ReactRoutes>
      <Route element={<Layout />} errorElement={<Error />}>
        {Object.keys(ROUTES_CONFIG).map((routeKey) => {
          const key = routeKey as RouteKey;

          return (
            <Route
              key={key}
              path={ROUTES_CONFIG[key].path}
              element={ROUTES_CONFIG[key].component}
            />
          );
        })}
      </Route>
    </ReactRoutes>
  </Router>
);

export default Routes;
