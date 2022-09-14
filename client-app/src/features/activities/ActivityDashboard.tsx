import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import ActivityList from "./dashboard/ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import ActivityForm from "./form/ActivityForm";

//DASHBOARD DISPLAYS  EVENTS
interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, deleteActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
      </Grid.Column>

      <GridColumn width="6">
        {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />}
        {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />}
      </GridColumn>
    </Grid>
  );
}
//see if activies[0] is true if so populate
