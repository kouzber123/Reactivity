import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
      { path: "createActivity", element: <ActivityForm key="create" /> },
      { path: "errors", element: <TestErrors /> },
      { path: "server-error", element: <ServerError /> },
      { path: "login", element: <LoginForm /> }
      // <Route  key={location.key}  path={["/createActivity", "/manage/:id"]}  Component={ActivityForm}/>
    ]
  }
];

export const router = createBrowserRouter(routes);
