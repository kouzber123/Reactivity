import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

//APP.TSX HANDLES EVERYTHING
//<Activity>  =  set a type
function App() {
  //create location key from router dom to track whetever user is in id form or not
  //when user clicks edit the data will come
  //when user clicks ceate activity whilst being on edit page
  //new empty form will appear instead because of tracking key
  const location = useLocation();

  //PROPS FROM LAYOUTS AND FEATURES

  //the ones in yellow are ones that do not observe
  //the blues observe

  //conditional pathing
  //any route that matches / + else
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <Route path={"/errors"} component={TestErrors} />
                <Route path={"/server-error"} component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
