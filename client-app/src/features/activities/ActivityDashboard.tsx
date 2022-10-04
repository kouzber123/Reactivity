import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityList from "./dashboard/ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import ActivityForm from "./form/ActivityForm";

//DASHBOARD DISPLAYS  EVENTS

export default observer(function ActivityDashboard() {
  //HERE WE ADD THE COMPONENTS FROM THE DETAILS , DASHBOARD and FORM

  const { activityStore } = useStore();
  //props
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>

      <GridColumn width="6">
        {selectedActivity && !editMode && <ActivityDetails />}

        {editMode && <ActivityForm />}
      </GridColumn>
    </Grid>
  );
});
//see if activies[0] is true if so populate
