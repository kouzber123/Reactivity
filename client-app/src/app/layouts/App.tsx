import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponents";
import ModalContainer from "../common/modals/modalContainer";
import HomePage from "../../features/home/HomePage";

//APP.TSX HANDLES EVERYTHING
//<Activity>  =  set a type
function App() {
  const { commonStore, userStore, activityStore } = useStore();
  const location = useLocation();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore, activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app..." />;
  return (
    <>
      <ScrollRestoration />
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
