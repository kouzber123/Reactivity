import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponents";


//APP.TSX HANDLES EVERYTHING
//<Activity>  =  set a type
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  //-----------fetch data from the api USING AXIOS using agent.ts 
  useEffect(() => {
    agent.Activities.list().then(response => {

      //update response before setiing it
      //make activity array empty
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      })
      //newly created activities here
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  //----------select
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  //------------cancel select
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  //----------Edit select and CANCEL

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    }else{
      //give activity id and add to the db
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    }
  }
  //filter removes everything thats not id
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
   
  }

  if (loading) return <LoadingComponent content="Loading app" />
  //html + props

  //PROPS FROM LAYOUTS AND FEATURES
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity={selectedActivity} 
        selectActivity={handleSelectActivity} 
        cancelSelectActivity={handleCancelSelectActivity} 
        editMode={editMode} 
        openForm={handleFormOpen} 
        closeForm={handleFormClose} 
        createOrEdit={handleCreateOrEditActivity} 
        deleteActivity={handleDeleteActivity} 
        submitting={submitting}
        />
        
      </Container>
    </>
  );
}

export default App;
