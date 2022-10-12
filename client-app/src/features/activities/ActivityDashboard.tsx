import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../app/layouts/LoadingComponents";
import { useStore } from "../../app/stores/store";
import ActivityList from "./dashboard/ActivityList";
//DASHBOARD DISPLAYS  EVENTS

export default observer(function ActivityDashboard() {
  //HERE WE ADD THE COMPONENTS FROM THE DETAILS , DASHBOARD and FORM

  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  //if map array is 0 then load api activities otherwise no need
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>

      <GridColumn width="6">
        <h2>Activity Filters WIP</h2>
      </GridColumn>
    </Grid>
  );
});
//see if activies[0] is true if so populate
