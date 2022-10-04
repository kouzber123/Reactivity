import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

import LoadingComponent from "./LoadingComponents";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

//APP.TSX HANDLES EVERYTHING
//<Activity>  =  set a type
function App() {
  const { activityStore } = useStore();

  //-----------fetch data from the api USING AXIOS using agent.ts
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  //----------select

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />;
  //html + props

  //PROPS FROM LAYOUTS AND FEATURES
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
